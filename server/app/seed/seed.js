require('dotenv').config({ quiet: true });
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../models');
const catalogue = require('./data/poutines');
const demo = require('./data/demo');

const Poutine = db.poutines;
const User = db.users;
const Tag = db.tags;
const Task = db.tasks;
const UserPoutine = db.userPoutines;

const SPRITE_DIR = path.join(__dirname, '..', '..', '..', 'client', 'src', 'assets', 'poutines');
const RARITIES = ['common', 'rare', 'epic', 'legendary'];
const SALT_ROUNDS = 10;
const HOUR = 60 * 60 * 1000;
const hoursFromNow = (hours) => new Date(Date.now() + hours * HOUR);

function checkCatalogue() {
  const errors = [];
  const files = fs.readdirSync(SPRITE_DIR).filter((file) => file.endsWith('.png'));
  const slugs = catalogue.map((poutine) => poutine.slug);

  if (new Set(slugs).size !== slugs.length) {
    errors.push('Two poutines have the same slug.');
  }

  for (const poutine of catalogue) {
    if (!files.includes(`${poutine.slug}.png`)) {
      errors.push(`${poutine.slug}: no file ${poutine.slug}.png in the sprites folder.`);
    }
    if (!poutine.name || poutine.name.length > 60) {
      errors.push(`${poutine.slug}: name is empty or longer than 60 characters.`);
    }
    if (!poutine.lore || poutine.lore.length > 300) {
      errors.push(`${poutine.slug}: lore is empty or longer than 300 characters.`);
    }
    if (!RARITIES.includes(poutine.rarity)) {
      errors.push(`${poutine.slug}: rarity must be one of ${RARITIES.join(', ')}.`);
    }
  }

  for (const file of files) {
    if (!slugs.includes(path.parse(file).name)) {
      errors.push(`${file}: no poutine uses this sprite.`);
    }
  }

  for (const rarity of RARITIES) {
    if (!catalogue.some((poutine) => poutine.rarity === rarity)) {
      errors.push(`No ${rarity} poutine: a box could not give every rarity.`);
    }
  }

  return errors;
}

async function seedPoutines() {
  for (const poutine of catalogue) {
    await Poutine.upsert({
      slug: poutine.slug,
      name: poutine.name,
      lore: poutine.lore,
      rarity: poutine.rarity,
      sprite: `${poutine.slug}.png`,
    });
  }
}

async function seedDemo() {
  const companion = await Poutine.findOne({ where: { slug: demo.companion } });
  if (!companion) {
    throw new Error(`Unknown companion in demo data: ${demo.companion}`);
  }

  const [user] = await User.findOrCreate({
    where: { email: demo.user.email },
    defaults: {
      username: demo.user.username,
      password_hash: await bcrypt.hash(demo.user.password, SALT_ROUNDS),
      fries_balance: demo.user.fries_balance,
      daily_goal: demo.user.daily_goal,
      current_streak: demo.user.current_streak,
      best_streak: demo.user.best_streak,
      last_completed_on: demo.user.last_completed_on,
      companion_poutine_id: companion.id,
    },
  });

  for (const owned of demo.poutines) {
    const poutine = await Poutine.findOne({ where: { slug: owned.slug } });
    if (!poutine) {
      throw new Error(`Unknown poutine in demo data: ${owned.slug}`);
    }
    await UserPoutine.findOrCreate({
      where: { user_id: user.id, poutine_id: poutine.id },
      defaults: { quantity: owned.quantity },
    });
  }

  const tagsByName = {};
  for (const item of demo.tags) {
    const [tag] = await Tag.findOrCreate({
      where: { user_id: user.id, name: item.name },
      defaults: { color: item.color },
    });
    tagsByName[item.name] = tag;
  }

  for (const item of demo.tasks) {
    const [task] = await Task.findOrCreate({
      where: { user_id: user.id, title: item.title },
      defaults: {
        description: item.description,
        status: item.status,
        priority: item.priority,
        position: item.position,
        due_at: item.due_in_hours === null ? null : hoursFromNow(item.due_in_hours),
        completed_at: item.done_hours_ago === null ? null : hoursFromNow(-item.done_hours_ago),
        rewarded_at: item.done_hours_ago === null ? null : hoursFromNow(-item.done_hours_ago),
      },
    });
    await task.setTags(item.tags.map((name) => tagsByName[name]));
  }
}

async function main() {
  const errors = checkCatalogue();
  if (errors.length > 0) {
    console.error('Seed aborted, fix the catalogue first:');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  await db.connex.sync();
  await seedPoutines();
  await seedDemo();
  console.log('Seed done.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => db.connex.close());

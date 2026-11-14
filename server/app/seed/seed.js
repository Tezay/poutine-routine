require('dotenv').config({ quiet: true });
const bcrypt = require('bcryptjs');
const db = require('../models');
const catalogue = require('./data/poutines');
const demo = require('./data/demo');

const Poutine = db.poutines;
const User = db.users;
const Tag = db.tags;
const Task = db.tasks;
const UserPoutine = db.userPoutines;

const HOUR = 60 * 60 * 1000;
const hoursFromNow = (hours) => new Date(Date.now() + hours * HOUR);

async function seedPoutines() {
  for (const poutine of catalogue) {
    await Poutine.upsert({
      slug: poutine.slug,
      name: poutine.name,
      lore: poutine.lore,
      rarity: poutine.rarity,
      sprite: `poutines/${poutine.slug}`,
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
      password_hash: await bcrypt.hash(demo.user.password, 10),
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

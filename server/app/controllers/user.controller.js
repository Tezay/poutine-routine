const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const db = require('../models');

const User = db.users;
const Poutine = db.poutines;
const UserPoutine = db.userPoutines;

const STARTER_SLUG = 'simple-poutine-orange';

// Compared when the email is unknown, so both login failures take the same time.
const FAKE_HASH = bcrypt.hashSync('not-a-real-password', 10);

exports.create = async (req, res) => {
  const { username, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const id = await db.connex.transaction(async (transaction) => {
      // The poutines come from the seed script, so the starter can be missing on an empty database.
      const starter = await Poutine.findOne({ where: { slug: STARTER_SLUG }, transaction });
      const user = await User.create(
        { username, email, password_hash: passwordHash, companion_poutine_id: starter?.id },
        { transaction },
      );
      if (starter) {
        await UserPoutine.create({ user_id: user.id, poutine_id: starter.id }, { transaction });
      }
      return user.id;
    });
    res.status(201).send(await User.findByPk(id));
  } catch (err) {
    if (err instanceof db.Sequelize.UniqueConstraintError) {
      return res.status(409).send({ message: 'Email or username already used.' });
    }
    throw err;
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.unscoped().findOne({ where: { email } });
  const isValid = await bcrypt.compare(password, user ? user.password_hash : FAKE_HASH);
  if (!user || !isValid) {
    return res.status(401).send({ message: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: user.id }, authConfig.SECRET, { expiresIn: '24h' });
  res.cookie(authConfig.COOKIE_NAME, token, {
    ...authConfig.COOKIE_OPTIONS,
    maxAge: authConfig.MAX_AGE,
  });
  res.send(await User.findByPk(user.id));
};

exports.auth = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  res.clearCookie(authConfig.COOKIE_NAME, authConfig.COOKIE_OPTIONS);
  res.send({ message: 'Logged out.' });
};

exports.update = async (req, res) => {
  const { email, password, daily_goal } = req.body;
  const updates = {};
  if (email !== undefined) {
    updates.email = email;
  }
  if (password !== undefined) {
    updates.password_hash = await bcrypt.hash(password, 10);
  }
  if (daily_goal !== undefined) {
    updates.daily_goal = daily_goal;
  }

  try {
    await req.user.update(updates);
    res.send(await User.findByPk(req.user.id));
  } catch (err) {
    if (err instanceof db.Sequelize.UniqueConstraintError) {
      return res.status(409).send({ message: 'Email already used.' });
    }
    throw err;
  }
};

exports.delete = async (req, res) => {
  await req.user.destroy();
  res.clearCookie(authConfig.COOKIE_NAME, authConfig.COOKIE_OPTIONS);
  res.send({ message: 'Account deleted.' });
};

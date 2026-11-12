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
  if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).send({ message: 'Username, email and password are required.' });
  }
  // bcrypt ignores everything after 72 bytes.
  if (password.length < 8 || password.length > 72) {
    return res.status(400).send({ message: 'Password must have 8 to 72 characters.' });
  }

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
    if (err instanceof db.Sequelize.ValidationError) {
      return res.status(400).send({ message: 'Invalid email.' });
    }
    throw err;
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).send({ message: 'Email and password are required.' });
  }

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
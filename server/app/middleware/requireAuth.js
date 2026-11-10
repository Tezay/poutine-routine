const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const db = require('../models');

const User = db.users;

module.exports = async (req, res, next) => {
  const token = req.cookies[authConfig.COOKIE_NAME];
  if (!token) {
    return res.status(401).send({ message: 'Not logged in.' });
  }

  let payload;
  try {
    payload = jwt.verify(token, authConfig.SECRET, { algorithms: ['HS256'] });
  } catch {
    return res.status(401).send({ message: 'Not logged in.' });
  }

  // The account may have been deleted while the token is still valid.
  const user = await User.findByPk(payload.id);
  if (!user) {
    return res.status(401).send({ message: 'Not logged in.' });
  }

  req.user = user;
  next();
};

const { body } = require('express-validator');
const validate = require('../middleware/validate.js');

// bcrypt ignores everything after 72 bytes.
const PASSWORD_MESSAGE = 'Password must have 8 to 72 characters.';

exports.register = [
  body('username', 'Username must have 1 to 30 characters.')
    .isString()
    .trim()
    .isLength({ min: 1, max: 30 }),
  body('email', 'Invalid email.').isEmail().isLength({ max: 120 }),
  body('password', PASSWORD_MESSAGE).isString().isLength({ min: 8, max: 72 }),
  validate,
];

exports.login = [
  body(['email', 'password'], 'Email and password are required.').isString(),
  validate,
];

exports.update = [
  body('email', 'Invalid email.').optional().isEmail().isLength({ max: 120 }),
  body('password', PASSWORD_MESSAGE).optional().isString().isLength({ min: 8, max: 72 }),
  body('daily_goal', 'Daily goal must be between 1 and 127.')
    .optional()
    .isInt({ min: 1, max: 127 }),
  validate,
];

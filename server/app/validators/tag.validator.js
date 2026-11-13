const { body } = require('express-validator');
const validate = require('../middleware/validate.js');

const NAME_MESSAGE = 'Name must have 1 to 30 characters.';
const COLOR_MESSAGE = 'Color must be a #rrggbb value.';

exports.create = [
  body('name', NAME_MESSAGE).isString().trim().isLength({ min: 1, max: 30 }),
  body('color', COLOR_MESSAGE)
    .optional()
    .matches(/^#[0-9a-fA-F]{6}$/),
  validate,
];

exports.update = [
  body('name', NAME_MESSAGE).optional().isString().trim().isLength({ min: 1, max: 30 }),
  body('color', COLOR_MESSAGE)
    .optional()
    .matches(/^#[0-9a-fA-F]{6}$/),
  validate,
];

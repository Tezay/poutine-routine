const { body } = require('express-validator');
const validate = require('../middleware/validate.js');

const TITLE_MESSAGE = 'Title must have 1 to 120 characters.';
const STATUS_MESSAGE = 'Status must be todo, doing or done.';
const PRIORITY_MESSAGE = 'Priority must be low, medium, high or null.';
const DUE_AT_MESSAGE = 'due_at must be a date or null.';
const TAG_IDS_MESSAGE = 'tag_ids must be a list of tag ids.';

exports.create = [
  body('title', TITLE_MESSAGE).isString().trim().isLength({ min: 1, max: 120 }),
  body('description', 'Description must be a text or null.')
    .optional({ values: 'null' })
    .isString(),
  body('status', STATUS_MESSAGE).optional().isIn(['todo', 'doing', 'done']),
  body('priority', PRIORITY_MESSAGE).optional({ values: 'null' }).isIn(['low', 'medium', 'high']),
  body('due_at', DUE_AT_MESSAGE).optional({ values: 'null' }).isISO8601(),
  body('tag_ids', TAG_IDS_MESSAGE).optional().isArray(),
  body('tag_ids.*', TAG_IDS_MESSAGE).isInt({ min: 1 }),
  validate,
];

exports.update = [
  body('title', TITLE_MESSAGE).optional().isString().trim().isLength({ min: 1, max: 120 }),
  body('description', 'Description must be a text or null.')
    .optional({ values: 'null' })
    .isString(),
  body('priority', PRIORITY_MESSAGE).optional({ values: 'null' }).isIn(['low', 'medium', 'high']),
  body('due_at', DUE_AT_MESSAGE).optional({ values: 'null' }).isISO8601(),
  body('tag_ids', TAG_IDS_MESSAGE).optional().isArray(),
  body('tag_ids.*', TAG_IDS_MESSAGE).isInt({ min: 1 }),
  validate,
];

exports.move = [body('status', STATUS_MESSAGE).isIn(['todo', 'doing', 'done']), validate];

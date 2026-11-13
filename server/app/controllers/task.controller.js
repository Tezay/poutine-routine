const db = require('../models');
const { setTaskTags } = require('./tag.controller.js');

const Task = db.tasks;
const Tag = db.tags;
const { Op } = db.Sequelize;

const TITLE_MAX_LENGTH = 120;
const STATUSES = ['todo', 'doing', 'done'];
const PRIORITIES = ['low', 'medium', 'high'];

class InvalidTagsError extends Error {}

const withTags = [
  {
    model: Tag,
    attributes: ['id', 'name', 'color', 'created_at'],
    through: { attributes: [] },
  },
];

const TASK_ATTRIBUTES = { exclude: ['user_id'] };

function readTaskBody(body, isCreate) {
  const values = {};

  if (body.title !== undefined || isCreate) {
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (title.length < 1 || title.length > TITLE_MAX_LENGTH) {
      return { error: `Title is required and has ${TITLE_MAX_LENGTH} characters at most.` };
    }
    values.title = title;
  }

  if (body.description !== undefined) {
    if (body.description !== null && typeof body.description !== 'string') {
      return { error: 'Description must be a text or null.' };
    }
    values.description = body.description;
  }

  if (body.priority !== undefined) {
    if (body.priority !== null && !PRIORITIES.includes(body.priority)) {
      return { error: 'Priority must be low, medium, high or null.' };
    }
    values.priority = body.priority;
  }

  if (body.due_at !== undefined) {
    const isDate = typeof body.due_at === 'string' && !Number.isNaN(Date.parse(body.due_at));
    if (body.due_at !== null && !isDate) {
      return { error: 'due_at must be a date or null.' };
    }
    values.due_at = body.due_at;
  }

  if (isCreate && body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      return { error: 'Status must be todo, doing or done.' };
    }
    values.status = body.status;
  }

  return { values };
}

async function findOwnedTask(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return null;
  }
  return Task.findOne({ where: { id, user_id: req.user.id } });
}

function findTaskWithTags(id, userId) {
  return Task.findOne({
    where: { id, user_id: userId },
    attributes: TASK_ATTRIBUTES,
    include: withTags,
    order: [[Tag, 'name', 'ASC']],
  });
}

async function endPosition(userId, status, transaction, exceptId) {
  const where = { user_id: userId, status };
  if (exceptId) {
    where.id = { [Op.ne]: exceptId };
  }
  const last = await Task.max('position', { where, transaction });
  return Number.isFinite(last) ? last + 1 : 0;
}

exports.findAll = async (req, res) => {
  const tasks = await Task.findAll({
    where: { user_id: req.user.id },
    attributes: TASK_ATTRIBUTES,
    include: withTags,
    order: [
      ['position', 'ASC'],
      ['id', 'ASC'],
      [Tag, 'name', 'ASC'],
    ],
  });
  res.send(tasks);
};

exports.create = async (req, res) => {
  const body = req.body ?? {};
  const { error, values } = readTaskBody(body, true);
  if (error) {
    return res.status(400).send({ message: error });
  }

  try {
    const id = await db.connex.transaction(async (transaction) => {
      const status = values.status ?? 'todo';
      const position = await endPosition(req.user.id, status, transaction);
      const task = await Task.create(
        { ...values, status, position, user_id: req.user.id },
        { transaction },
      );
      const result = await setTaskTags(task, body.tag_ids, req.user.id, transaction);
      if (result.error) {
        throw new InvalidTagsError(result.error);
      }
      return task.id;
    });
    res.status(201).send(await findTaskWithTags(id, req.user.id));
  } catch (err) {
    if (err instanceof InvalidTagsError) {
      return res.status(400).send({ message: err.message });
    }
    throw err;
  }
};

exports.update = async (req, res) => {
  const task = await findOwnedTask(req);
  if (!task) {
    return res.status(404).send({ message: 'Task not found.' });
  }

  const body = req.body ?? {};
  const { error, values } = readTaskBody(body, false);
  if (error) {
    return res.status(400).send({ message: error });
  }
  if (Object.keys(values).length === 0 && body.tag_ids === undefined) {
    return res.status(400).send({ message: 'Nothing to update.' });
  }

  try {
    await db.connex.transaction(async (transaction) => {
      await task.update(values, { transaction });
      const result = await setTaskTags(task, body.tag_ids, req.user.id, transaction);
      if (result.error) {
        throw new InvalidTagsError(result.error);
      }
    });
    res.send(await findTaskWithTags(task.id, req.user.id));
  } catch (err) {
    if (err instanceof InvalidTagsError) {
      return res.status(400).send({ message: err.message });
    }
    throw err;
  }
};

exports.move = async (req, res) => {
  const task = await findOwnedTask(req);
  if (!task) {
    return res.status(404).send({ message: 'Task not found.' });
  }

  const { status } = req.body ?? {};
  if (!STATUSES.includes(status)) {
    return res.status(400).send({ message: 'Status must be todo, doing or done.' });
  }

  await db.connex.transaction(async (transaction) => {
    const position = await endPosition(req.user.id, status, transaction, task.id);
    await task.update({ status, position }, { transaction });
  });

  res.send({
    task: await findTaskWithTags(task.id, req.user.id),
    fries_earned: 0,
    fries_balance: req.user.fries_balance,
  });
};

exports.delete = async (req, res) => {
  const task = await findOwnedTask(req);
  if (!task) {
    return res.status(404).send({ message: 'Task not found.' });
  }

  await task.destroy();
  res.send({ message: 'Task deleted.' });
};

const db = require('../models');

const Task = db.tasks;
const Tag = db.tags;
const FriesTransaction = db.friesTransactions;

// Hides the columns of the task_tags table.
const withTags = { model: Tag, through: { attributes: [] } };

const findTask = (id, userId) => {
  return Task.findOne({ where: { id, user_id: userId }, include: withTags });
};

// null if one of the ids is not a tag of this user.
const findTags = async (tagIds, userId) => {
  const tags = await Tag.findAll({ where: { id: tagIds, user_id: userId } });
  return tags.length === tagIds.length ? tags : null;
};

const endOfColumn = async (userId, status) => {
  const last = await Task.max('position', { where: { user_id: userId, status } });
  return last === null ? 0 : last + 1;
};

exports.findAll = async (req, res) => {
  const tasks = await Task.findAll({
    where: { user_id: req.user.id },
    include: withTags,
    order: [
      ['position', 'ASC'],
      ['id', 'ASC'],
    ],
  });
  res.send(tasks);
};

exports.create = async (req, res) => {
  const { title, description, priority, due_at } = req.body;
  const status = req.body.status || 'todo';

  const tags = await findTags(req.body.tag_ids || [], req.user.id);
  if (!tags) {
    return res.status(400).send({ message: 'Unknown tag.' });
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    due_at,
    position: await endOfColumn(req.user.id, status),
    completed_at: status === 'done' ? new Date() : null,
    user_id: req.user.id,
  });
  await task.setTags(tags);
  res.status(201).send(await findTask(task.id, req.user.id));
};

exports.update = async (req, res) => {
  const task = await findTask(req.params.id, req.user.id);
  if (!task) {
    return res.status(404).send({ message: 'Task not found.' });
  }

  const { title, description, priority, due_at, tag_ids } = req.body;
  const updates = {};
  if (title !== undefined) {
    updates.title = title;
  }
  if (description !== undefined) {
    updates.description = description;
  }
  if (priority !== undefined) {
    updates.priority = priority;
  }
  if (due_at !== undefined) {
    updates.due_at = due_at;
  }

  if (tag_ids !== undefined) {
    const tags = await findTags(tag_ids, req.user.id);
    if (!tags) {
      return res.status(400).send({ message: 'Unknown tag.' });
    }
    await task.setTags(tags);
  }

  await task.update(updates);
  res.send(await findTask(task.id, req.user.id));
};

exports.move = async (req, res) => {
  const task = await findTask(req.params.id, req.user.id);
  if (!task) {
    return res.status(404).send({ message: 'Task not found.' });
  }

  const { status } = req.body;
  // rewarded_at is set the first time (so a task that leaves "Done" and comes back pays nothing)
  const isPaid = status === 'done' && task.status !== 'done' && task.rewarded_at === null;
  const isOnTime = isPaid && task.due_at !== null && new Date() <= task.due_at;
  const friesEarned = (isPaid ? 10 : 0) + (isOnTime ? 5 : 0);

  if (status !== task.status) {
    task.completed_at = status === 'done' ? new Date() : null;
  }
  if (isPaid) {
    task.rewarded_at = new Date();
  }
  task.position = await endOfColumn(req.user.id, status);
  task.status = status;

  await db.connex.transaction(async (transaction) => {
    await task.save({ transaction });
    if (isPaid) {
      await FriesTransaction.create(
        { user_id: req.user.id, task_id: task.id, amount: 10, reason: 'task_completed' },
        { transaction },
      );
    }
    if (isOnTime) {
      await FriesTransaction.create(
        { user_id: req.user.id, task_id: task.id, amount: 5, reason: 'on_time_bonus' },
        { transaction },
      );
    }
    if (friesEarned > 0) {
      await req.user.update(
        { fries_balance: req.user.fries_balance + friesEarned },
        { transaction },
      );
    }
  });

  res.send({
    task: await findTask(task.id, req.user.id),
    fries_earned: friesEarned,
    fries_balance: req.user.fries_balance,
  });
};

exports.delete = async (req, res) => {
  const task = await findTask(req.params.id, req.user.id);
  if (!task) {
    return res.status(404).send({ message: 'Task not found.' });
  }

  await task.destroy();
  res.send({ message: 'Task deleted.' });
};

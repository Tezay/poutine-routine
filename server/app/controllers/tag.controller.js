const db = require('../models');

const Tag = db.tags;

const NAME_MAX_LENGTH = 30;
const COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

function readTagBody(body, isCreate) {
  const values = {};

  if (body.name !== undefined || isCreate) {
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (name.length < 1 || name.length > NAME_MAX_LENGTH) {
      return { error: `Name must have 1 to ${NAME_MAX_LENGTH} characters.` };
    }
    values.name = name;
  }

  if (body.color !== undefined) {
    if (typeof body.color !== 'string' || !COLOR_PATTERN.test(body.color)) {
      return { error: 'Color must be a #rrggbb value.' };
    }
    values.color = body.color.toLowerCase();
  }

  if (Object.keys(values).length === 0) {
    return { error: 'Name or color is required.' };
  }
  return { values };
}

async function findOwnedTag(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return null;
  }
  return Tag.findOne({ where: { id, user_id: req.user.id } });
}

exports.findAll = async (req, res) => {
  const tags = await Tag.findAll({
    where: { user_id: req.user.id },
    order: [['name', 'ASC']],
  });
  res.send(tags);
};

exports.create = async (req, res) => {
  const { error, values } = readTagBody(req.body ?? {}, true);
  if (error) {
    return res.status(400).send({ message: error });
  }

  try {
    const tag = await Tag.create({ ...values, user_id: req.user.id });
    res.status(201).send(tag);
  } catch (err) {
    if (err instanceof db.Sequelize.UniqueConstraintError) {
      return res.status(409).send({ message: 'You already have a tag with this name.' });
    }
    throw err;
  }
};

exports.update = async (req, res) => {
  const tag = await findOwnedTag(req);
  if (!tag) {
    return res.status(404).send({ message: 'Tag not found.' });
  }

  const { error, values } = readTagBody(req.body ?? {}, false);
  if (error) {
    return res.status(400).send({ message: error });
  }

  try {
    await tag.update(values);
    res.send(tag);
  } catch (err) {
    if (err instanceof db.Sequelize.UniqueConstraintError) {
      return res.status(409).send({ message: 'You already have a tag with this name.' });
    }
    throw err;
  }
};

exports.delete = async (req, res) => {
  const tag = await findOwnedTag(req);
  if (!tag) {
    return res.status(404).send({ message: 'Tag not found.' });
  }

  await tag.destroy();
  res.send({ message: 'Tag deleted.' });
};

// For the tasks API: sets the tags of a task from tag_ids. Undefined keeps them, [] removes all.
exports.setTaskTags = async (task, tagIds, userId, transaction) => {
  if (tagIds === undefined) {
    return {};
  }
  if (!Array.isArray(tagIds) || !tagIds.every((id) => Number.isInteger(id) && id > 0)) {
    return { error: 'tag_ids must be a list of tag ids.' };
  }

  const uniqueIds = [...new Set(tagIds)];
  const tags = uniqueIds.length
    ? await Tag.findAll({ where: { id: uniqueIds, user_id: userId }, transaction })
    : [];
  if (tags.length !== uniqueIds.length) {
    return { error: 'One or more tags do not exist.' };
  }

  await task.setTags(tags, { transaction });
  return {};
};

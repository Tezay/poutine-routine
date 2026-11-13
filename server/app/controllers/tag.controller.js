const db = require('../models');

const Tag = db.tags;

exports.findAll = async (req, res) => {
  const tags = await Tag.findAll({
    where: { user_id: req.user.id },
    order: [['name', 'ASC']],
  });
  res.send(tags);
};

exports.create = async (req, res) => {
  const { name, color } = req.body;
  try {
    const tag = await Tag.create({ name, color, user_id: req.user.id });
    res.status(201).send(await Tag.findByPk(tag.id));
  } catch (err) {
    if (err instanceof db.Sequelize.UniqueConstraintError) {
      return res.status(409).send({ message: 'You already have a tag with this name.' });
    }
    throw err;
  }
};

exports.update = async (req, res) => {
  const tag = await Tag.findOne({ where: { id: req.params.id, user_id: req.user.id } });
  if (!tag) {
    return res.status(404).send({ message: 'Tag not found.' });
  }

  const { name, color } = req.body;
  const updates = {};
  if (name !== undefined) {
    updates.name = name;
  }
  if (color !== undefined) {
    updates.color = color;
  }

  try {
    await tag.update(updates);
    res.send(tag);
  } catch (err) {
    if (err instanceof db.Sequelize.UniqueConstraintError) {
      return res.status(409).send({ message: 'You already have a tag with this name.' });
    }
    throw err;
  }
};

exports.delete = async (req, res) => {
  const tag = await Tag.findOne({ where: { id: req.params.id, user_id: req.user.id } });
  if (!tag) {
    return res.status(404).send({ message: 'Tag not found.' });
  }

  await tag.destroy();
  res.send({ message: 'Tag deleted.' });
};

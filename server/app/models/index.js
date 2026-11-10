const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const connex = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  // Dates are stored in UTC
  timezone: '+00:00',
  logging: false,
  define: { underscored: true, createdAt: 'created_at', updatedAt: 'updated_at' },
});

const db = {};
db.Sequelize = Sequelize;
db.connex = connex;
db.users = require('./user.model.js')(connex, Sequelize);
db.tasks = require('./task.model.js')(connex, Sequelize);
db.tags = require('./tag.model.js')(connex, Sequelize);
db.taskTags = require('./task_tag.model.js')(connex, Sequelize);
db.poutines = require('./poutine.model.js')(connex, Sequelize);
db.userPoutines = require('./user_poutine.model.js')(connex, Sequelize);
db.friesTransactions = require('./fries_transaction.model.js')(connex, Sequelize);

// A user owns tasks and tags.
db.users.hasMany(db.tasks, {
  foreignKey: { name: 'user_id', allowNull: false },
  onDelete: 'CASCADE',
});
db.tasks.belongsTo(db.users, { foreignKey: 'user_id' });
db.users.hasMany(db.tags, {
  foreignKey: { name: 'user_id', allowNull: false },
  onDelete: 'CASCADE',
});
db.tags.belongsTo(db.users, { foreignKey: 'user_id' });

// A task has several tags, a tag is on several tasks.
db.tasks.belongsToMany(db.tags, {
  through: db.taskTags,
  foreignKey: 'task_id',
  otherKey: 'tag_id',
  onDelete: 'CASCADE',
});
db.tags.belongsToMany(db.tasks, {
  through: db.taskTags,
  foreignKey: 'tag_id',
  otherKey: 'task_id',
  onDelete: 'CASCADE',
});

// A user owns poutines, with the number of copies in user_poutines.
db.users.belongsToMany(db.poutines, {
  through: db.userPoutines,
  foreignKey: 'user_id',
  otherKey: 'poutine_id',
  onDelete: 'CASCADE',
});
db.poutines.belongsToMany(db.users, {
  through: db.userPoutines,
  foreignKey: 'poutine_id',
  otherKey: 'user_id',
  onDelete: 'CASCADE',
});
db.users.hasMany(db.userPoutines, { foreignKey: 'user_id' });
db.userPoutines.belongsTo(db.users, { foreignKey: 'user_id' });
db.poutines.hasMany(db.userPoutines, { foreignKey: 'poutine_id' });
db.userPoutines.belongsTo(db.poutines, { foreignKey: 'poutine_id' });

// The poutine shown beside the board.
db.users.belongsTo(db.poutines, {
  as: 'companion',
  foreignKey: 'companion_poutine_id',
  onDelete: 'SET NULL',
});

// The history of the fries.
db.users.hasMany(db.friesTransactions, {
  foreignKey: { name: 'user_id', allowNull: false },
  onDelete: 'CASCADE',
});
db.friesTransactions.belongsTo(db.users, { foreignKey: 'user_id' });
db.tasks.hasMany(db.friesTransactions, { foreignKey: 'task_id', onDelete: 'SET NULL' });
db.friesTransactions.belongsTo(db.tasks, { foreignKey: 'task_id' });
db.poutines.hasMany(db.friesTransactions, { foreignKey: 'poutine_id', onDelete: 'SET NULL' });
db.friesTransactions.belongsTo(db.poutines, { foreignKey: 'poutine_id' });

module.exports = db;

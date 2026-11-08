module.exports = (connex, Sequelize) => {
  const Task = connex.define(
    'task',
    {
      title: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM('todo', 'doing', 'done'),
        allowNull: false,
        defaultValue: 'todo',
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      due_at: {
        type: Sequelize.DATE,
      },
      completed_at: {
        type: Sequelize.DATE,
      },
      rewarded_at: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
      indexes: [{ fields: ['user_id', 'status', 'position'] }, { fields: ['user_id', 'due_at'] }],
    },
  );

  return Task;
};

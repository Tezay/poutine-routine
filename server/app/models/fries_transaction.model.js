module.exports = (connex, Sequelize) => {
  const FriesTransaction = connex.define(
    'fries_transaction',
    {
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reason: {
        type: Sequelize.ENUM(
          'task_completed',
          'on_time_bonus',
          'daily_goal',
          'box_opened',
          'duplicate_refund',
        ),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      indexes: [{ fields: ['user_id', 'created_at'] }],
    },
  );

  return FriesTransaction;
};

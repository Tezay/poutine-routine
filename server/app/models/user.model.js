module.exports = (connex, Sequelize) => {
  const User = connex.define(
    'user',
    {
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password_hash: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      fries_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      daily_goal: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 3,
      },
      current_streak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      best_streak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      last_completed_on: {
        type: Sequelize.DATEONLY,
      },
    },
    { timestamps: true },
  );

  return User;
};

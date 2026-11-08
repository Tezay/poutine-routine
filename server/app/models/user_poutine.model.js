module.exports = (connex, Sequelize) => {
  const UserPoutine = connex.define(
    'user_poutine',
    {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      first_obtained_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    { timestamps: false },
  );

  return UserPoutine;
};

module.exports = (connex, Sequelize) => {
  const Poutine = connex.define(
    'poutine',
    {
      slug: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      lore: {
        type: Sequelize.STRING(300),
      },
      rarity: {
        type: Sequelize.ENUM('common', 'rare', 'epic', 'legendary'),
        allowNull: false,
        defaultValue: 'common',
      },
      sprite: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      effect: {
        type: Sequelize.STRING(40),
      },
    },
    { timestamps: false },
  );

  return Poutine;
};

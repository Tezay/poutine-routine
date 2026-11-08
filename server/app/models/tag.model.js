module.exports = (connex, Sequelize) => {
  const Tag = connex.define(
    'tag',
    {
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      color: {
        type: Sequelize.CHAR(7),
        allowNull: false,
        defaultValue: '#0969da',
        validate: {
          is: /^#[0-9a-fA-F]{6}$/,
        },
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      indexes: [{ unique: true, fields: ['user_id', 'name'] }],
    },
  );

  return Tag;
};

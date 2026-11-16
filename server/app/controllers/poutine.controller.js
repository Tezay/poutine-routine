const db = require('../models');

const Poutine = db.poutines;
const UserPoutine = db.userPoutines;

exports.findAll = async (req, res) => {
  const poutines = await Poutine.findAll({
    include: [
      {
        model: UserPoutine,
        where: { user_id: req.user.id },
        required: false,
      },
    ],
    order: [['id', 'ASC']],
  });

  res.send(
    poutines.map((poutine) => {
      const owned = poutine.user_poutines[0];
      return {
        id: poutine.id,
        slug: poutine.slug,
        name: poutine.name,
        lore: poutine.lore,
        rarity: poutine.rarity,
        sprite: poutine.sprite,
        effect: poutine.effect,
        quantity: owned ? owned.quantity : 0,
        first_obtained_at: owned ? owned.first_obtained_at : null,
      };
    }),
  );
};

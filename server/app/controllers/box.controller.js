const crypto = require('crypto');
const db = require('../models');
const boxConfig = require('../config/box.config.js');

const User = db.users;
const Poutine = db.poutines;
const UserPoutine = db.userPoutines;
const FriesTransaction = db.friesTransactions;

const drawRarity = () => {
  let roll = crypto.randomInt(100);
  for (const [rarity, chance] of Object.entries(boxConfig.ODDS)) {
    if (roll < chance) {
      return rarity;
    }
    roll -= chance;
  }
};

exports.buy = async (req, res) => {
  const poutines = await Poutine.findAll({ where: { rarity: drawRarity() } });
  const poutine = poutines[crypto.randomInt(poutines.length)];

  const result = await db.connex.transaction(async (transaction) => {
    const user = await User.findByPk(req.user.id, { transaction, lock: true });
    if (user.fries_balance < boxConfig.PRICE) {
      return null;
    }

    await user.update({ fries_balance: user.fries_balance - boxConfig.PRICE }, { transaction });
    await FriesTransaction.create(
      { user_id: user.id, poutine_id: poutine.id, amount: -boxConfig.PRICE, reason: 'box_opened' },
      { transaction },
    );

    const [owned, isNew] = await UserPoutine.findOrCreate({
      where: { user_id: user.id, poutine_id: poutine.id },
      transaction,
    });
    if (!isNew) {
      await owned.update({ quantity: owned.quantity + 1 }, { transaction });
    }
    return { user, owned, isNew };
  });

  if (!result) {
    return res.status(400).send({ message: 'Not enough fries.' });
  }

  res.send({
    poutine: {
      ...poutine.toJSON(),
      quantity: result.owned.quantity,
      first_obtained_at: result.owned.first_obtained_at,
    },
    is_new: result.isNew,
    fries_balance: result.user.fries_balance,
  });
};

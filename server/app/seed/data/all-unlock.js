const demo = require('./demo');
const poutines = require('./poutines');

module.exports = {
  user: {
    username: 'romano-debloco',
    email: 'debloco@mariam.app',
    password: 'debloco123',
    fries_balance: 9999,
    daily_goal: 3,
    current_streak: 0,
    best_streak: 0,
    last_completed_on: null,
  },
  companion: 'poutine-poutine',
  poutines: poutines.map((poutine) => ({ slug: poutine.slug, quantity: 1 })),
  tags: demo.tags,
  tasks: [],
};

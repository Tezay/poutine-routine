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
  poutines: poutines.map((p) => ({ slug: p.slug, quantity: 1 })),
  tags: [
    { name: 'School', color: '#0969da' },
    { name: 'Sport', color: '#1a7f37' },
    { name: 'Travel', color: '#8250df' },
    { name: 'Life', color: '#9a6700' },
  ],
  tasks: [],
};

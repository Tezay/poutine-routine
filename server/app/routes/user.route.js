module.exports = (app) => {
  const user = require('../controllers/user.controller.js');
  const rules = require('../validators/user.validator.js');
  const requireAuth = require('../middleware/requireAuth.js');
  const { rateLimit } = require('express-rate-limit');
  const router = require('express').Router();

  // Only failed attempts count, so a normal user is never blocked.
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    skipSuccessfulRequests: true,
    message: { message: 'Too many attempts. Try again in 15 minutes.' },
  });

  router.post('/', limiter, rules.register, user.create);
  router.post('/login', limiter, rules.login, user.login);
  router.get('/auth', requireAuth, user.auth);
  router.post('/logout', user.logout);
  router.put('/', requireAuth, rules.update, user.update);
  router.delete('/', requireAuth, user.delete);

  app.use('/api/user', router);
};

module.exports = (app) => {
  const user = require('../controllers/user.controller.js');
  const requireAuth = require('../middleware/requireAuth.js');
  const router = require('express').Router();

  router.post('/', user.create);
  router.post('/login', user.login);
  router.get('/auth', requireAuth, user.auth);
  router.post('/logout', user.logout);

  app.use('/api/user', router);
};

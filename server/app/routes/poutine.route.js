module.exports = (app) => {
  const poutines = require('../controllers/poutine.controller.js');
  const requireAuth = require('../middleware/requireAuth.js');
  const router = require('express').Router();

  router.use(requireAuth);

  router.get('/', poutines.findAll);

  app.use('/api/poutines', router);
};

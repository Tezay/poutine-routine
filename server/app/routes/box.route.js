module.exports = (app) => {
  const boxes = require('../controllers/box.controller.js');
  const requireAuth = require('../middleware/requireAuth.js');
  const router = require('express').Router();

  router.use(requireAuth);

  router.post('/', boxes.buy);

  app.use('/api/boxes', router);
};

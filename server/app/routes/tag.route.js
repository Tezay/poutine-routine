module.exports = (app) => {
  const tags = require('../controllers/tag.controller.js');
  const requireAuth = require('../middleware/requireAuth.js');
  const router = require('express').Router();

  router.use(requireAuth);

  router.get('/', tags.findAll);
  router.post('/', tags.create);
  router.put('/:id', tags.update);
  router.delete('/:id', tags.delete);

  app.use('/api/tags', router);
};

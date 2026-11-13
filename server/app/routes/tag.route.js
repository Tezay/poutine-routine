module.exports = (app) => {
  const tags = require('../controllers/tag.controller.js');
  const rules = require('../validators/tag.validator.js');
  const requireAuth = require('../middleware/requireAuth.js');
  const router = require('express').Router();

  router.use(requireAuth);

  router.get('/', tags.findAll);
  router.post('/', rules.create, tags.create);
  router.put('/:id', rules.update, tags.update);
  router.delete('/:id', tags.delete);

  app.use('/api/tags', router);
};

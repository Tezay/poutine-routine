module.exports = (app) => {
  const tasks = require('../controllers/task.controller.js');
  const rules = require('../validators/task.validator.js');
  const requireAuth = require('../middleware/requireAuth.js');
  const router = require('express').Router();

  router.use(requireAuth);

  router.get('/', tasks.findAll);
  router.post('/', rules.create, tasks.create);
  router.put('/:id', rules.update, tasks.update);
  router.put('/:id/move', rules.move, tasks.move);
  router.delete('/:id', tasks.delete);

  app.use('/api/tasks', router);
};

module.exports = (app) => {
  const tasks = require('../controllers/task.controller.js');
  const requireAuth = require('../middleware/requireAuth.js');
  const router = require('express').Router();

  router.use(requireAuth);

  router.get('/', tasks.findAll);
  router.post('/', tasks.create);
  router.put('/:id', tasks.update);
  router.put('/:id/move', tasks.move);
  router.delete('/:id', tasks.delete);

  app.use('/api/tasks', router);
};

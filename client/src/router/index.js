import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';

const routes = [{ path: '/', name: 'board', component: BoardView }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

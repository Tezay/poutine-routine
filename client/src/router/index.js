import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', name: 'board', component: BoardView },
  { path: '/login', name: 'login', component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

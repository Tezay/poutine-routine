import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import TableView from '../views/TableView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', name: 'board', component: BoardView },
  { path: '/table', name: 'table', component: TableView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import TableView from '../views/TableView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
  { path: '/', name: 'board', component: BoardView },
  { path: '/table', name: 'table', component: TableView },
  { path: '/register', name: 'register', component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

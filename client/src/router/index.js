import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import TableView from '../views/TableView.vue';
import RegisterView from '../views/RegisterView.vue';
import PoutinerieView from '../views/PoutinerieView.vue';

const routes = [
  { path: '/', name: 'board', component: BoardView },
  { path: '/table', name: 'table', component: TableView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/poutinerie', name: 'poutinerie', component: PoutinerieView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

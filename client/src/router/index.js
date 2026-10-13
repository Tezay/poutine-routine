import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import TableView from '../views/TableView.vue';

const routes = [
  { path: '/', name: 'board', component: BoardView },
  { path: '/table', name: 'table', component: TableView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

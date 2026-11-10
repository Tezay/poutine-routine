import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import TableView from '../views/TableView.vue';
import RegisterView from '../views/RegisterView.vue';
import PoutinerieView from '../views/PoutinerieView.vue';
import LoginView from '../views/LoginView.vue';
import SettingsView from '../views/SettingsView.vue';
import { useAuthStore } from '../stores/auth.js';

const routes = [
  { path: '/register', name: 'register', component: RegisterView, meta: { layout: 'auth' } },
  { path: '/login', name: 'login', component: LoginView, meta: { layout: 'auth' } },
  { path: '/', name: 'board', component: BoardView, meta: { requiresAuth: true } },
  { path: '/table', name: 'table', component: TableView, meta: { requiresAuth: true } },
  {
    path: '/poutinerie',
    name: 'poutinerie',
    component: PoutinerieView,
    meta: { requiresAuth: true },
  },
  { path: '/settings', name: 'settings', component: SettingsView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  if (!authStore.isReady) {
    await authStore.checkAuth();
  }
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' };
  }
});

export default router;

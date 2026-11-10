import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App).use(createPinia()).use(router);

// The first navigation waits for the session check, so a logged-out visitor never sees the app shell.
router.isReady().then(() => app.mount('#app'));

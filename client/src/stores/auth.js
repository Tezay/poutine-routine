import { defineStore } from 'pinia';
import UserDataService from '../services/UserDataService.js';

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      user: null,
      isReady: false,
    };
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    // Asks the server who the cookie belongs to. Any failure means "not logged in".
    async checkAuth() {
      try {
        const response = await UserDataService.auth();
        this.user = response.data;
      } catch {
        this.user = null;
      } finally {
        this.isReady = true;
      }
    },
    async login(credentials) {
      const response = await UserDataService.login(credentials);
      this.user = response.data;
    },
    async logout() {
      await UserDataService.logout();
      this.user = null;
    },
  },
});

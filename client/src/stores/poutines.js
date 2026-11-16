import { defineStore } from 'pinia';
import PoutineDataService from '../services/PoutineDataService.js';
import { useAuthStore } from './auth.js';

const messageOf = (error) => error.response?.data?.message ?? 'Cannot reach the server.';

export const usePoutinesStore = defineStore('poutines', {
  state() {
    return {
      poutines: [],
      isLoading: false,
      errorMessage: '',
    };
  },
  getters: {
    ownedPoutines(state) {
      return state.poutines.filter((poutine) => poutine.quantity > 0);
    },
  },
  actions: {
    async fetchAll() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const response = await PoutineDataService.getAll();
        this.poutines = response.data;
      } catch (error) {
        this.errorMessage = messageOf(error);
      } finally {
        this.isLoading = false;
      }
    },
    async openBox() {
      const response = await PoutineDataService.openBox();
      this.replacePoutine(response.data.poutine);
      useAuthStore().user.fries_balance = response.data.fries_balance;
      return response.data;
    },
    replacePoutine(updatedPoutine) {
      const index = this.poutines.findIndex((poutine) => poutine.id === updatedPoutine.id);
      this.poutines[index] = updatedPoutine;
    },
  },
});

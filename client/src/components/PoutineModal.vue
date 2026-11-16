<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-fg-default/40 p-4"
    @keydown.esc="$emit('close')"
    @mousedown.self="$emit('close')"
  >
    <div
      ref="dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="poutine-title"
      tabindex="-1"
      class="w-full max-w-sm overflow-hidden rounded-lg border border-border-default bg-bg-default outline-none"
    >
      <div class="flex flex-col items-center gap-3 px-6 py-6 text-center">
        <div class="flex aspect-square w-52 items-center justify-center rounded-lg bg-bg-inset">
          <PoutineSprite :slug="poutine.slug" class="size-48" />
        </div>
        <h2 id="poutine-title" class="font-pixel text-xl">{{ poutine.name }}</h2>
        <p class="text-sm text-fg-muted">{{ poutine.lore }}</p>
        <span class="text-xs text-fg-muted">
          {{ poutine.rarity }} · ×{{ poutine.quantity }} in your collection
        </span>
        <p v-if="errorMessage" role="alert" class="text-sm text-fg-danger">{{ errorMessage }}</p>
      </div>

      <div
        class="flex items-center justify-center gap-2 border-t border-border-default bg-bg-muted px-6 py-4"
      >
        <button
          type="button"
          :disabled="isCompanion"
          class="cursor-pointer rounded-md bg-bg-primary-emphasis px-3 py-1.5 text-sm font-medium text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover disabled:cursor-default disabled:opacity-50"
          @click="setCompanion"
        >
          {{ isCompanion ? 'Your companion' : 'Set as companion' }}
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-md border border-border-default px-3 py-1.5 text-sm font-medium hover:bg-bg-muted-hover"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PoutineSprite from './PoutineSprite.vue';
import UserDataService from '../services/UserDataService.js';
import { useAuthStore } from '../stores/auth.js';

export default {
  components: {
    PoutineSprite,
  },
  props: {
    poutine: { type: Object, required: true },
  },
  emits: ['close'],
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  data() {
    return {
      errorMessage: '',
    };
  },
  computed: {
    isCompanion() {
      return this.authStore.user.companion_poutine_id === this.poutine.id;
    },
  },
  mounted() {
    this.$refs.dialog.focus();
  },
  methods: {
    async setCompanion() {
      this.errorMessage = '';
      try {
        const response = await UserDataService.updateCompanion(this.poutine.id);
        this.authStore.setUser(response.data);
      } catch (error) {
        this.errorMessage = error.response?.data?.message ?? 'Cannot reach the server.';
      }
    },
  },
};
</script>

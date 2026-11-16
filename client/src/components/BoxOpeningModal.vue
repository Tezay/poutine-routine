<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    @keydown.esc="$emit('close')"
    @mousedown.self="$emit('close')"
  >
    <div
      ref="dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="box-opening-title"
      tabindex="-1"
      class="w-full max-w-sm overflow-hidden rounded-lg border border-border-default bg-bg-default outline-none"
    >
      <div
        v-if="poutine"
        class="flex flex-col items-center gap-3 px-6 py-6 text-center"
        aria-live="polite"
      >
        <span class="rounded-full px-2 py-1 text-xs" :class="rarityClasses">
          {{ poutine.rarity }}
        </span>

        <div class="flex aspect-square w-52 items-center justify-center rounded-lg bg-bg-inset">
          <PoutineSprite :slug="poutine.slug" class="size-48" />
        </div>

        <h2 id="box-opening-title" class="font-pixel text-xl">{{ poutine.name }}</h2>
        <p class="text-sm text-fg-muted">{{ poutine.lore }}</p>

        <span
          v-if="isNew"
          class="rounded-full border border-border-default px-2 py-1 text-xs text-fg-muted"
        >
          New in your collection
        </span>
      </div>

      <p v-else-if="errorMessage" role="alert" class="p-6 text-center text-sm text-fg-danger">
        {{ errorMessage }}
      </p>

      <div
        class="flex items-center justify-center gap-2 border-t border-border-default bg-bg-muted px-6 py-4"
      >
        <button
          type="button"
          :disabled="!canOpenAnother"
          class="rounded-md bg-bg-primary-emphasis px-3 py-1.5 text-sm font-medium text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover disabled:opacity-50"
          @click="openAnother"
        >
          Open another · {{ boxCost }} 🍟
        </button>
        <button
          type="button"
          class="rounded-md border border-border-default px-3 py-1.5 text-sm font-medium hover:bg-bg-muted-hover"
          @click="$emit('close')"
        >
          Back to Poutinerie
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PoutineSprite from './PoutineSprite.vue';
import { useAuthStore } from '../stores/auth.js';
import { usePoutinesStore } from '../stores/poutines.js';

export default {
  components: {
    PoutineSprite,
  },
  props: {
    boxCost: { type: Number, required: true },
  },
  emits: ['close'],
  setup() {
    const authStore = useAuthStore();
    const poutinesStore = usePoutinesStore();
    return {
      authStore,
      poutinesStore,
    };
  },
  data() {
    return {
      poutine: null,
      isNew: false,
      isOpening: false,
      errorMessage: '',
    };
  },
  computed: {
    canOpenAnother() {
      return !this.isOpening && this.authStore.user.fries_balance >= this.boxCost;
    },
    rarityClasses() {
      const baseClass = 'font-medium';
      switch (this.poutine?.rarity) {
        case 'common':
          return `${baseClass} bg-bg-neutral-muted text-fg-muted`;
        case 'rare':
          return `${baseClass} bg-bg-accent-muted text-fg-accent`;
        case 'epic':
          return `${baseClass} bg-bg-done-muted text-fg-done`;
        case 'legendary':
          return `${baseClass} bg-bg-attention-muted text-fg-attention`;
        default:
          return `${baseClass} bg-bg-neutral-muted text-fg-muted`;
      }
    },
  },
  mounted() {
    this.$refs.dialog.focus();
    this.openAnother();
  },
  methods: {
    async openAnother() {
      this.errorMessage = '';
      this.isOpening = true;
      try {
        const result = await this.poutinesStore.openBox();
        this.poutine = result.poutine;
        this.isNew = result.is_new;
      } catch (error) {
        this.errorMessage = error.response?.data?.message ?? 'Cannot reach the server.';
      } finally {
        this.isOpening = false;
      }
    },
  },
};
</script>

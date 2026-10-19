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
      aria-labelledby="box-opening-title"
      tabindex="-1"
      class="w-full max-w-sm overflow-hidden outline-none rounded-lg border border-border-default bg-bg-default"
    >
      <div class="flex flex-col items-center gap-3 px-6 py-6 text-center" aria-live="polite">
        <span class="rounded-full px-2 py-1 text-xs" :class="rarityClasses">
          {{ poutine.rarity }}
        </span>

        <div class="flex aspect-square w-40 items-center justify-center rounded-lg bg-bg-inset">
          <PoutineSprite :slug="poutine.slug" class="size-32" />
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
import poutines from '../mock/poutines.js';
import user from '../mock/user.js';

const BOX_COST = 50;

function pickRandomPoutine() {
  const index = Math.floor(Math.random() * poutines.length);
  return poutines[index];
}

export default {
  components: {
    PoutineSprite,
  },
  emits: ['close'],
  data() {
    return {
      user,
      boxCost: BOX_COST,
      poutine: pickRandomPoutine(),
    };
  },
  computed: {
    isNew() {
      return this.poutine.quantity === 0;
    },
    canOpenAnother() {
      return this.user.fries_balance >= this.boxCost;
    },
    rarityClasses() {
      const baseClass = 'font-medium';
      switch (this.poutine.rarity) {
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
  },
  methods: {
    openAnother() {
      this.poutine = pickRandomPoutine();
    },
  },
};
</script>

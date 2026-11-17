<template>
  <AppTopbar title="Poutinerie" />

  <div class="p-6">
    <p v-if="poutinesStore.errorMessage" role="alert" class="mb-4 text-sm text-fg-danger">
      {{ poutinesStore.errorMessage }}
    </p>

    <section
      class="mb-6 flex items-center justify-between rounded-lg bg-bg-muted p-4"
      aria-label="Collection progress"
    >
      <div class="font-medium text-fg-default">
        {{ collectedCount }} / {{ totalCount }} collected
      </div>
      <div class="mx-4 h-2 flex-1 overflow-hidden rounded-full bg-bg-inset" aria-hidden="true">
        <div
          class="h-full bg-bg-primary-emphasis transition-all duration-300"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
      <div class="text-sm text-fg-muted">
        <template v-if="tasksToNextBox > 0">
          Next box in {{ tasksToNextBox }} {{ tasksToNextBox === 1 ? 'task' : 'tasks' }}
        </template>
        <template v-else>A box is ready</template>
      </div>
    </section>

    <section class="grid grid-cols-4 gap-4" aria-label="Poutine catalogue">
      <button
        v-for="poutine in poutines"
        :key="poutine.id"
        type="button"
        :disabled="!isOwned(poutine)"
        class="flex flex-col items-center rounded-xl border p-4"
        :class="getCardClasses(poutine)"
        @click="selectedPoutine = poutine"
      >
        <div class="relative mt-4 mb-4 w-full">
          <div
            v-if="poutine.quantity > 1"
            class="absolute right-0 bottom-full mb-1 text-xs font-medium text-fg-muted"
          >
            ×{{ poutine.quantity }}
          </div>

          <div class="flex aspect-square w-full items-center justify-center rounded-lg bg-bg-inset">
            <PoutineSprite
              :slug="poutine.slug"
              class="size-24"
              :class="{ 'brightness-0 opacity-30': !isOwned(poutine) }"
            />
          </div>
        </div>

        <h2
          class="mb-2 text-center font-pixel"
          :class="isOwned(poutine) ? 'text-fg-default' : 'text-fg-muted'"
        >
          {{ displayName(poutine) }}
        </h2>

        <span
          class="mt-auto rounded-full px-2 py-1 text-xs"
          :class="getRarityClasses(displayRarity(poutine))"
        >
          {{ displayRarity(poutine) }}
        </span>
      </button>
    </section>
  </div>

  <PoutineModal v-if="selectedPoutine" :poutine="selectedPoutine" @close="selectedPoutine = null" />
</template>

<script>
import AppTopbar from '../components/AppTopbar.vue';
import PoutineModal from '../components/PoutineModal.vue';
import PoutineSprite from '../components/PoutineSprite.vue';
import { useAuthStore } from '../stores/auth.js';
import { usePoutinesStore } from '../stores/poutines.js';

export default {
  components: {
    AppTopbar,
    PoutineModal,
    PoutineSprite,
  },
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
      selectedPoutine: null,
    };
  },
  computed: {
    poutines() {
      return this.poutinesStore.poutines;
    },
    totalCount() {
      return this.poutines.length;
    },
    collectedCount() {
      return this.poutines.filter((poutine) => this.isOwned(poutine)).length;
    },
    tasksToNextBox() {
      return Math.ceil((50 - this.authStore.user.fries_balance) / 10);
    },
    progressPercentage() {
      if (this.totalCount === 0) return 0;
      return Math.round((this.collectedCount / this.totalCount) * 100);
    },
  },
  methods: {
    isOwned(poutine) {
      return poutine.quantity > 0;
    },
    displayName(poutine) {
      return this.isOwned(poutine) ? poutine.name : 'Locked';
    },
    displayRarity(poutine) {
      return this.isOwned(poutine) ? poutine.rarity : 'unknown';
    },
    getCardClasses(poutine) {
      if (!this.isOwned(poutine)) return 'bg-bg-muted border-dashed border-border-muted';
      return 'bg-bg-default border-border-muted cursor-pointer hover:border-border-accent';
    },
    getRarityClasses(rarity) {
      const baseClass = 'font-medium';
      switch (rarity) {
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
};
</script>

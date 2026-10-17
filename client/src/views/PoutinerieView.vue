<template>
  <div class="flex flex-col h-full bg-bg-default">
    <AppTopbar title="Poutinerie" />

    <div class="p-6 overflow-y-auto">
      <!-- Collection progress -->
      <section
        class="flex items-center justify-between p-4 mb-6 rounded-lg bg-bg-muted"
        aria-label="Collection progress"
      >
        <div class="text-fg-default font-medium">
          {{ collectedCount }} / {{ totalCount }} collected
        </div>
        <div class="flex-1 mx-4 h-2 rounded-full bg-bg-inset overflow-hidden" aria-hidden="true">
          <div
            class="h-full bg-bg-primary-emphasis transition-all duration-300"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
        <div class="text-fg-muted text-sm">Next box in 2 tasks</div>
      </section>

      <section class="grid grid-cols-4 gap-4" aria-label="Poutine catalogue">
        <article
          v-for="poutine in poutines"
          :key="poutine.id"
          class="relative flex flex-col items-center p-4 rounded-xl border transition-all duration-300 z-10"
          :class="getCardClasses(poutine)"
        >
          <!-- Glow for legendary poutines -->
          <div
            v-if="poutine.quantity > 0 && poutine.rarity === 'legendary'"
            class="absolute -inset-2 bg-bg-attention-muted border-4 border-border-accent rounded-2xl -z-10 motion-safe:animate-pulse blur-sm opacity-80"
            aria-hidden="true"
          ></div>

          <div class="w-full relative mb-4 mt-4">
            <div
              v-if="poutine.quantity > 1"
              class="absolute bottom-full right-0 mb-1 text-xs text-fg-muted font-medium"
            >
              ×{{ poutine.quantity }}
            </div>

            <!-- Sprite (Placeholder) -->
            <div
              class="w-full aspect-square flex items-center justify-center rounded-lg border-2 border-dashed border-border-muted bg-bg-inset text-fg-muted text-sm"
              aria-hidden="true"
            >
              <span v-if="poutine.quantity > 0">32×32 sprite</span>
              <span v-else class="text-2xl">?</span>
            </div>
          </div>

          <h2
            class="font-pixel text-fg-default mb-2 text-center"
            :class="{ 'text-fg-muted': poutine.quantity === 0 }"
          >
            {{ poutine.quantity > 0 ? poutine.name : 'Locked' }}
          </h2>

          <span
            class="px-2 py-1 text-xs rounded-full"
            :class="getRarityClasses(poutine.quantity > 0 ? poutine.rarity : 'unknown')"
          >
            {{ poutine.quantity > 0 ? poutine.rarity : 'unknown' }}
          </span>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
import AppTopbar from '../components/AppTopbar.vue';
import poutines from '../mock/poutines.js';

export default {
  components: {
    AppTopbar,
  },
  data() {
    return {
      poutines: poutines,
    };
  },
  computed: {
    totalCount() {
      return this.poutines.length;
    },
    collectedCount() {
      return this.poutines.filter((p) => p.quantity > 0).length;
    },
    progressPercentage() {
      if (this.totalCount === 0) return 0;
      return Math.round((this.collectedCount / this.totalCount) * 100);
    },
  },
  methods: {
    getCardClasses(poutine) {
      if (poutine.quantity === 0) {
        return 'opacity-75 bg-bg-muted border-border-muted';
      }
      if (poutine.rarity === 'legendary') {
        return 'bg-bg-default border-border-accent';
      }
      return 'bg-bg-default border-border-muted';
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
        case 'unknown':
        default:
          return `${baseClass} bg-bg-muted text-fg-muted`;
      }
    },
  },
};
</script>

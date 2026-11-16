<template>
  <aside class="flex flex-col gap-4 border-l border-border-default p-4">
    <h2 class="text-xs font-semibold uppercase text-fg-muted">Companion</h2>

    <div
      v-if="companion"
      class="flex flex-col items-center gap-3 rounded-lg border border-border-default bg-bg-muted p-4 text-center"
    >
      <PoutineSprite :slug="companion.slug" class="size-48" />
      <h3 class="font-pixel text-xl">{{ companion.name }}</h3>
      <p
        v-if="companion.lore"
        class="rounded-md border border-border-muted bg-bg-default px-3 py-1.5 text-sm text-fg-muted"
      >
        {{ companion.lore }}
      </p>
    </div>
    <p v-else class="text-sm text-fg-muted">Open a box to get your first companion.</p>

    <div class="flex flex-col gap-2 text-sm">
      <div class="flex justify-between">
        <span class="text-fg-muted">Daily goal</span>
        <span>{{ user.daily_goal }} tasks</span>
      </div>
      <div class="flex justify-between">
        <span class="text-fg-muted">Streak</span>
        <span>🔥 {{ user.current_streak }} days</span>
      </div>
    </div>

    <button
      type="button"
      :disabled="!canOpenBox"
      class="w-full cursor-pointer rounded-md bg-bg-primary-emphasis px-3 py-1.5 text-sm font-medium text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover disabled:cursor-not-allowed disabled:opacity-50"
      @click="showBoxModal = true"
    >
      Open a box · {{ boxCost }} 🍟
    </button>
    <BoxOpeningModal v-if="showBoxModal" :box-cost="boxCost" @close="showBoxModal = false" />
  </aside>
</template>

<script>
import PoutineSprite from './PoutineSprite.vue';
import BoxOpeningModal from './BoxOpeningModal.vue';
import { useAuthStore } from '../stores/auth.js';
import { usePoutinesStore } from '../stores/poutines.js';

export default {
  components: {
    PoutineSprite,
    BoxOpeningModal,
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
      boxCost: 50,
      showBoxModal: false,
    };
  },
  computed: {
    user() {
      return this.authStore.user ?? {};
    },
    companion() {
      return this.poutinesStore.poutines.find(
        (poutine) => poutine.id === this.user.companion_poutine_id,
      );
    },
    canOpenBox() {
      return this.user.fries_balance >= this.boxCost;
    },
  },
  // The companion rail is on every page once logged in, so it loads the poutines.
  mounted() {
    this.poutinesStore.fetchAll();
  },
};
</script>

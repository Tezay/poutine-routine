<template>
  <aside class="flex flex-col gap-4 border-l border-border-default p-4">
    <h2 class="text-xs font-semibold uppercase text-fg-muted">Companion</h2>

    <div
      v-if="companion"
      class="flex flex-col items-center gap-3 rounded-lg border border-border-default bg-bg-muted p-4 text-center"
    >
      <div
        class="flex size-40 items-center justify-center border border-dashed border-border-default bg-bg-inset text-sm text-fg-muted"
      >
        32x32 sprite
      </div>
      <h3 class="font-pixel text-xl">{{ companion.name }}</h3>
      <p
        class="rounded-md border border-border-muted bg-bg-default px-3 py-1.5 text-sm text-fg-muted"
      >
        One more task and I get my gravy.
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
  </aside>
</template>

<script>
import user from '../mock/user.js';
import poutines from '../mock/poutines.js';

export default {
  data() {
    return {
      user,
      poutines,
    };
  },
  computed: {
    companion() {
      return this.poutines.find((poutine) => poutine.id === this.user.companion_poutine_id);
    },
  },
};
</script>

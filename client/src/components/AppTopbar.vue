<template>
  <header class="flex items-center gap-3 border-b border-border-default px-6 py-3">
    <h1 class="text-lg font-semibold">{{ title }}</h1>

    <input
      v-model="tasksStore.searchQuery"
      type="search"
      placeholder="Search tasks..."
      aria-label="Search tasks"
      class="ml-auto w-64 rounded-md border border-border-default bg-bg-default px-3 py-1.5 text-sm"
    />
    <span class="rounded-full border border-border-default px-3 py-1 text-sm font-semibold">
      🍟 {{ user.fries_balance }}
    </span>
    <button
      v-if="actionLabel"
      type="button"
      class="rounded-md bg-bg-primary-emphasis px-3 py-1.5 text-sm font-medium text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </header>
</template>

<script>
import user from '../mock/user.js';
import { useTasksStore } from '../stores/tasks.js';

export default {
  props: {
    title: { type: String, required: true },
    actionLabel: { type: String, default: '' },
  },
  emits: ['action'],
  setup() {
    const tasksStore = useTasksStore();
    return {
      tasksStore,
    };
  },
  data() {
    return {
      user,
    };
  },
};
</script>

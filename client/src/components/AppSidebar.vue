<template>
  <aside class="flex flex-col gap-6 border-r border-border-default bg-bg-muted p-4">
    <div class="flex items-center gap-2">
      <img src="../assets/logo.svg" alt="" class="size-8" />
      <span class="font-pixel font-semibold text-xl">Poutine Routine</span>
    </div>

    <nav class="flex flex-col gap-0.5" aria-label="Main">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-bg-neutral-muted"
        active-class="bg-bg-neutral-muted font-semibold"
      >
        <img :src="iconUrl(link.icon)" alt="" class="size-4" />
        {{ link.label }}
      </router-link>
    </nav>

    <section>
      <h2 class="px-2 pb-1 text-xs font-semibold uppercase text-fg-muted">Tags</h2>
      <ul class="flex flex-col gap-0.5">
        <li v-for="tag in tasksStore.tags" :key="tag.id">
          <button
            type="button"
            :aria-pressed="isActive(tag.id)"
            class="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-bg-neutral-muted"
            :class="{ 'bg-bg-neutral-muted font-semibold': isActive(tag.id) }"
            @click="tasksStore.toggleTag(tag.id)"
          >
            <span class="size-2 rounded-full" :style="{ backgroundColor: tag.color }"></span>
            <span>{{ tag.name }}</span>
            <span class="ml-auto text-xs text-fg-muted">{{ taskCount(tag.id) }}</span>
          </button>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
import { useTasksStore } from '../stores/tasks.js';

export default {
  setup() {
    const tasksStore = useTasksStore();
    return {
      tasksStore,
    };
  },
  data() {
    return {
      links: [
        { label: 'Board', to: '/', icon: 'columns-3' },
        { label: 'Table', to: '/table', icon: 'table' },
        { label: 'Poutinerie', to: '/poutinerie', icon: 'playing-cards-fan' },
        { label: 'Settings', to: '/settings', icon: 'settings' },
      ],
    };
  },
  methods: {
    iconUrl(name) {
      return new URL(`../assets/icons/${name}.svg`, import.meta.url).href;
    },
    isActive(tagId) {
      return this.tasksStore.activeTagIds.includes(tagId);
    },
    taskCount(tagId) {
      return this.tasksStore.tasks.filter((task) => task.tags.some((tag) => tag.id === tagId))
        .length;
    },
  },
};
</script>

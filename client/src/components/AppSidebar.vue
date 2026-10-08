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
        class="rounded-md px-2 py-1.5 hover:bg-bg-neutral-muted"
        active-class="bg-bg-neutral-muted font-semibold"
      >
        {{ link.label }}
      </router-link>
    </nav>

    <section>
      <h2 class="px-2 pb-1 text-xs font-semibold uppercase text-fg-muted">Tags</h2>
      <ul class="flex flex-col gap-0.5">
        <li v-for="tag in tags" :key="tag.id" class="flex items-center gap-2 px-2 py-1.5">
          <span class="size-2 rounded-full" :style="{ backgroundColor: tag.color }"></span>
          <span>{{ tag.name }}</span>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
import tags from '../mock/tags.js';

export default {
  data() {
    return {
      tags,
      links: [
        { label: 'Board', to: '/' },
        { label: 'Table', to: '/table' },
        { label: 'Poutinerie', to: '/poutinerie' },
        { label: 'Settings', to: '/settings' },
      ],
    };
  },
};
</script>

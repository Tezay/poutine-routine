<template>
  <article class="rounded-md border border-border-default bg-bg-default p-3">
    <h3
      class="text-sm font-medium"
      :class="{ 'text-fg-muted line-through': task.status === 'done' }"
    >
      {{ task.title }}
    </h3>

    <ul v-if="task.tags.length || task.due_at" class="mt-2 flex flex-wrap items-center gap-1.5">
      <li
        v-for="tag in task.tags"
        :key="tag.id"
        class="flex items-center gap-1 rounded-full bg-bg-neutral-muted px-2 py-0.5 text-xs"
      >
        <span class="size-2 rounded-full" :style="{ backgroundColor: tag.color }"></span>
        {{ tag.name }}
      </li>
      <li v-if="task.due_at" class="text-xs text-fg-muted">Due {{ dueLabel }}</li>
    </ul>
  </article>
</template>

<script>
export default {
  props: {
    task: { type: Object, required: true },
  },
  computed: {
    dueLabel() {
      return new Date(this.task.due_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    },
  },
};
</script>

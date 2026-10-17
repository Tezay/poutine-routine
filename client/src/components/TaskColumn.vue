<template>
  <section class="rounded-lg border border-border-default bg-bg-muted p-3">
    <header class="mb-3 flex items-center gap-2">
      <span class="size-2.5 rounded-full bg-current" :class="dotClass"></span>
      <h2 class="text-sm font-semibold">{{ title }}</h2>
      <span class="rounded-full bg-bg-neutral-muted px-2 text-xs">{{ tasks.length }}</span>
    </header>

    <ul class="flex flex-col gap-2">
      <li v-for="task in tasks" :key="task.id" class="relative">
        <TaskCard :task="task" />
        <button
          type="button"
          :aria-label="`Edit task: ${task.title}`"
          class="absolute inset-0 cursor-pointer rounded-md hover:bg-fg-default/5"
          @click="$emit('select', task)"
        ></button>
      </li>
    </ul>
  </section>
</template>

<script>
import TaskCard from './TaskCard.vue';

export default {
  components: {
    TaskCard,
  },
  props: {
    title: { type: String, required: true },
    dotClass: { type: String, required: true },
    tasks: { type: Array, required: true },
  },
  emits: ['select'],
};
</script>

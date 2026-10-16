<template>
  <article
    class="rounded-md border p-3"
    :class="
      isOverdue ? 'border-border-danger bg-bg-danger-muted' : 'border-border-default bg-bg-default'
    "
  >
    <h3
      class="text-sm font-medium"
      :class="{ 'text-fg-muted line-through': task.status === 'done' }"
    >
      {{ task.title }}
    </h3>

    <ul v-if="task.tags.length || dueText" class="mt-2 flex flex-wrap items-center gap-1.5">
      <li
        v-for="tag in task.tags"
        :key="tag.id"
        class="flex items-center gap-1 rounded-full bg-bg-neutral-muted px-2 py-0.5 text-xs"
      >
        <span class="size-2 rounded-full" :style="{ backgroundColor: tag.color }"></span>
        {{ tag.name }}
      </li>
      <li
        v-if="dueText"
        class="flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs"
        :class="
          isOverdue
            ? 'bg-bg-danger-emphasis font-semibold text-fg-on-emphasis'
            : 'bg-bg-neutral-muted text-fg-muted'
        "
      >
        <span aria-hidden="true">⏱</span>
        {{ dueText }}
      </li>
    </ul>

    <div
      v-if="isPulsing"
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 z-50 hidden motion-safe:block motion-safe:animate-edge-pulse"
      @animationend="isPulsing = false"
    ></div>
  </article>
</template>

<script>
const MINUTE = 60 * 1000;

export default {
  props: {
    task: { type: Object, required: true },
  },
  data() {
    return {
      now: Date.now(),
      timerId: null,
      isPulsing: false,
    };
  },
  computed: {
    // Negative once the due date has passed. Null when there is nothing to count down to.
    msLeft() {
      if (!this.task.due_at || this.task.status === 'done') {
        return null;
      }
      return new Date(this.task.due_at).getTime() - this.now;
    },
    isOverdue() {
      return this.msLeft !== null && this.msLeft < 0;
    },
    dueText() {
      if (this.msLeft === null) {
        return '';
      }
      const duration = this.formatDuration(Math.abs(this.msLeft));
      return this.isOverdue ? `Overdue by ${duration}` : `Due in ${duration}`;
    },
  },
  watch: {
    isOverdue(isNowOverdue) {
      if (isNowOverdue) {
        this.isPulsing = true;
      }
    },
  },
  mounted() {
    this.timerId = setInterval(() => {
      this.now = Date.now();
    }, MINUTE);
  },
  beforeUnmount() {
    clearInterval(this.timerId);
  },
  methods: {
    formatDuration(ms) {
      const minutes = Math.max(1, Math.floor(ms / MINUTE));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days >= 1) {
        return days === 1 ? '1 day' : `${days} days`;
      }
      if (hours >= 1) {
        return minutes % 60 === 0 ? `${hours}h` : `${hours}h ${minutes % 60}m`;
      }
      return `${minutes}m`;
    },
  },
};
</script>

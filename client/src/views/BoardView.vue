<template>
  <AppTopbar title="My board" action-label="New task" />

  <div
    v-if="tasks.length === 0"
    class="m-6 flex flex-col items-center rounded-lg border border-dashed border-border-default bg-bg-muted px-6 py-16 text-center"
  >
    <div
      class="flex h-36 w-36 items-center justify-center rounded-lg border border-dashed border-border-default bg-bg-inset text-sm text-fg-muted"
    >
      illustration
    </div>
    <h2 class="mt-6 text-xl font-semibold">Nothing on the menu yet</h2>
    <p class="mt-2 text-fg-muted">
      Add your first task. Finish it and you will earn your first 10 fries.
    </p>
    <button
      type="button"
      class="mt-4 rounded-md bg-bg-primary-emphasis px-3 py-1.5 text-sm font-medium text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover"
    >
      New task
    </button>
  </div>

  <div
    v-else-if="visibleTasks.length === 0"
    class="m-6 flex flex-col items-center rounded-lg border border-dashed border-border-default bg-bg-muted px-6 py-16 text-center"
  >
    <h2 class="mt-6 text-xl font-semibold">No matching tasks</h2>
    <p class="mt-2 text-fg-muted">
      Try clearing your search or selecting a different tag.
    </p>
  </div>

  <div v-else class="grid grid-cols-3 items-start gap-4 p-6">
    <TaskColumn
      v-for="column in columns"
      :key="column.status"
      :title="column.label"
      :dot-class="column.dotClass"
      :tasks="tasksByStatus(column.status)"
    />
  </div>
</template>

<script>
import AppTopbar from '../components/AppTopbar.vue';
import TaskColumn from '../components/TaskColumn.vue';
import { useTasksStore } from '../stores/tasks.js';
import { mapState } from 'pinia';

export default {
  components: {
    AppTopbar,
    TaskColumn,
  },
  computed: {
    ...mapState(useTasksStore, ['tasks', 'visibleTasks', 'tasksByStatus']),
  },
  data() {
    return {
      columns: [
        { status: 'todo', label: 'To Do', dotClass: 'text-fg-success' },
        { status: 'doing', label: 'Doing', dotClass: 'text-fg-attention' },
        { status: 'done', label: 'Done', dotClass: 'text-fg-done' },
      ],
    };
  },
};
</script>

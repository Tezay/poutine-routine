<template>
  <AppTopbar title="My board" action-label="New task" @action="openCreateTaskModal" />

  <div
    v-if="tasksStore.tasks.length === 0"
    class="m-6 flex flex-col items-center rounded-lg border border-dashed border-border-default bg-bg-muted px-6 py-16 text-center"
  >
    <MascotSprite class="size-48" />
    <h2 class="mt-6 text-xl font-semibold">Nothing on the menu yet</h2>
    <p class="mt-2 text-fg-muted">
      Add your first task. Finish it and you will earn your first 10 fries.
    </p>
    <button
      type="button"
      class="mt-4 rounded-md bg-bg-primary-emphasis px-3 py-1.5 text-sm font-medium text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover"
      @click="openCreateTaskModal"
    >
      New task
    </button>
  </div>

  <div
    v-else-if="tasksStore.visibleTasks.length === 0"
    class="m-6 flex flex-col items-center rounded-lg border border-dashed border-border-default bg-bg-muted px-6 py-16 text-center"
  >
    <h2 class="text-xl font-semibold">No matching tasks</h2>
    <p class="mt-2 text-fg-muted">Try clearing your search or selecting a different tag.</p>
  </div>

  <div v-else class="grid grid-cols-3 items-start gap-4 p-6">
    <TaskColumn
      v-for="column in columns"
      :key="column.status"
      :title="column.label"
      :dot-class="column.dotClass"
      :tasks="tasksStore.tasksByStatus(column.status)"
      @select="openEditTaskModal"
      @drop-task="moveDroppedTask($event, column.status)"
    />
  </div>

  <TaskEditor ref="editor" />
</template>

<script>
import AppTopbar from '../components/AppTopbar.vue';
import MascotSprite from '../components/MascotSprite.vue';
import TaskColumn from '../components/TaskColumn.vue';
import TaskEditor from '../components/TaskEditor.vue';
import { useTasksStore } from '../stores/tasks.js';

export default {
  components: {
    AppTopbar,
    MascotSprite,
    TaskColumn,
    TaskEditor,
  },
  setup() {
    const tasksStore = useTasksStore();
    return {
      tasksStore,
    };
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
  methods: {
    openCreateTaskModal() {
      this.$refs.editor.open();
    },
    openEditTaskModal(task) {
      this.$refs.editor.open(task);
    },
    moveDroppedTask(taskId, status) {
      const droppedTask = this.tasksStore.tasks.find((task) => task.id === taskId);
      if (droppedTask && droppedTask.status !== status) {
        this.tasksStore.moveTask(taskId, status);
      }
    },
  },
};
</script>

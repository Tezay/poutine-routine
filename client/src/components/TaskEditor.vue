<template>
  <TaskModal
    v-if="isModalOpen"
    :task="editedTask"
    :tags="tasksStore.tags"
    @close="closeModal"
    @save="saveTask"
    @delete="deleteEditedTask"
  />
</template>

<script>
import TaskModal from './TaskModal.vue';
import { useTasksStore } from '../stores/tasks.js';

export default {
  components: {
    TaskModal,
  },
  setup() {
    const tasksStore = useTasksStore();
    return {
      tasksStore,
    };
  },
  data() {
    return {
      isModalOpen: false,
      editedTask: null,
      openerElement: null,
    };
  },
  methods: {
    open(task = null) {
      this.openerElement = document.activeElement;
      this.editedTask = task;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.editedTask = null;
      if (this.openerElement) {
        this.openerElement.focus();
      }
    },
    saveTask(fields) {
      if (this.editedTask === null) {
        this.tasksStore.addTask(fields);
      } else {
        this.updateEditedTask(fields);
      }
      this.closeModal();
    },
    updateEditedTask(fields) {
      const id = this.editedTask.id;
      this.tasksStore.updateTask(id, {
        title: fields.title,
        description: fields.description,
        priority: fields.priority,
        due_at: fields.due_at,
        tags: fields.tags,
      });
      if (fields.status !== this.editedTask.status) {
        this.tasksStore.moveTask(id, fields.status);
      }
    },
    deleteEditedTask() {
      this.tasksStore.deleteTask(this.editedTask.id);
      this.closeModal();
    },
  },
};
</script>

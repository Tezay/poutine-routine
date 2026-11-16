import { defineStore } from 'pinia';
import TaskDataService from '../services/TaskDataService.js';
import TagDataService from '../services/TagDataService.js';
import { useAuthStore } from './auth.js';

const messageOf = (error) => error.response?.data?.message ?? 'Cannot reach the server.';

export const useTasksStore = defineStore('tasks', {
  state() {
    return {
      tasks: [],
      tags: [],
      activeTagIds: [],
      searchQuery: '',
      isLoading: false,
      errorMessage: '',
      friesEarned: 0,
    };
  },
  getters: {
    visibleTasks(state) {
      let result = state.tasks;

      if (state.activeTagIds.length > 0) {
        result = result.filter((task) =>
          task.tags.some((tag) => state.activeTagIds.includes(tag.id)),
        );
      }

      if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase();
        result = result.filter(
          (task) =>
            task.title.toLowerCase().includes(query) ||
            task.tags.some((tag) => tag.name.toLowerCase().includes(query)),
        );
      }

      return result;
    },
    tasksByStatus() {
      return (status) =>
        this.visibleTasks
          .filter((task) => task.status === status)
          .sort((a, b) => a.position - b.position);
    },
  },
  actions: {
    async fetchAll() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const tasksResponse = await TaskDataService.getAll();
        const tagsResponse = await TagDataService.getAll();
        this.tasks = tasksResponse.data;
        this.tags = tagsResponse.data;
      } catch (error) {
        this.errorMessage = messageOf(error);
      } finally {
        this.isLoading = false;
      }
    },
    async addTask(fields) {
      this.errorMessage = '';
      try {
        const response = await TaskDataService.create({
          title: fields.title,
          description: fields.description,
          status: fields.status,
          priority: fields.priority,
          due_at: fields.due_at,
          tag_ids: fields.tags.map((tag) => tag.id),
        });
        this.tasks.push(response.data);
      } catch (error) {
        this.errorMessage = messageOf(error);
      }
    },
    // Status changes go through moveTask.
    async updateTask(id, changes) {
      this.errorMessage = '';
      try {
        const response = await TaskDataService.update(id, {
          title: changes.title,
          description: changes.description,
          priority: changes.priority,
          due_at: changes.due_at,
          tag_ids: changes.tags.map((tag) => tag.id),
        });
        this.replaceTask(response.data);
      } catch (error) {
        this.errorMessage = messageOf(error);
      }
    },
    async deleteTask(id) {
      this.errorMessage = '';
      try {
        await TaskDataService.delete(id);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        this.errorMessage = messageOf(error);
      }
    },
    // The server puts the task at the end of the column and sets completed_at.
    async moveTask(id, status) {
      this.errorMessage = '';
      try {
        const response = await TaskDataService.move(id, status);
        this.replaceTask(response.data.task);
        useAuthStore().user.fries_balance = response.data.fries_balance;
        if (response.data.fries_earned > 0) {
          this.friesEarned = response.data.fries_earned;
          setTimeout(() => {
            this.friesEarned = 0;
          }, 3000);
        }
      } catch (error) {
        this.errorMessage = messageOf(error);
      }
    },
    replaceTask(updatedTask) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      this.tasks[index] = updatedTask;
    },
    // The tag form shows the errors, so these actions do not catch them.
    async addTag(fields) {
      const response = await TagDataService.create(fields);
      this.tags.push(response.data);
    },
    // The tasks keep a copy of their tags, so everything is loaded again.
    async updateTag(id, changes) {
      await TagDataService.update(id, changes);
      await this.fetchAll();
    },
    async deleteTag(id) {
      await TagDataService.delete(id);
      this.activeTagIds = this.activeTagIds.filter((tagId) => tagId !== id);
      await this.fetchAll();
    },
    toggleTag(id) {
      if (this.activeTagIds.includes(id)) {
        this.activeTagIds = this.activeTagIds.filter((tagId) => tagId !== id);
      } else {
        this.activeTagIds.push(id);
      }
    },
  },
});

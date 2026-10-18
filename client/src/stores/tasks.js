import { defineStore } from 'pinia';
import tasks from '../mock/tasks.js';
import tags from '../mock/tags.js';

export const useTasksStore = defineStore('tasks', {
  state() {
    return {
      tasks,
      tags,
      activeTagId: null,
      searchQuery: '',
    };
  },
  getters: {
    visibleTasks(state) {
      let result = state.tasks;
      
      if (state.activeTagId !== null) {
        result = result.filter((task) => task.tags.some((tag) => tag.id === state.activeTagId));
      }
      
      if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase();
        result = result.filter((task) => 
        task.title.toLowerCase().includes(query) || 
        task.tags.some((tag) => tag.name.toLowerCase().includes(query))
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
    addTask(newTask) {
      const now = new Date().toISOString();
      // Temporary id until the API assigns the real one.
      const id = Date.now();
      this.tasks.push({
        id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        priority: newTask.priority,
        position: 0,
        due_at: newTask.due_at,
        completed_at: newTask.status === 'done' ? now : null,
        rewarded_at: null,
        created_at: now,
        updated_at: now,
        tags: newTask.tags,
      });
      const columnSize = this.tasks.filter((task) => task.status === newTask.status).length;
      this.moveTask(id, newTask.status, columnSize);
    },
    // Status changes go through moveTask, which keeps completed_at and positions in sync.
    updateTask(id, changes) {
      const updatedTask = this.tasks.find((task) => task.id === id);
      Object.assign(updatedTask, changes, { updated_at: new Date().toISOString() });
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    moveTask(id, status, position) {
      const now = new Date().toISOString();
      const movedTask = this.tasks.find((task) => task.id === id);
      if (movedTask.status !== status) {
        movedTask.status = status;
        movedTask.completed_at = status === 'done' ? now : null;
      }
      movedTask.updated_at = now;

      const column = this.tasks
        .filter((task) => task.status === status && task.id !== id)
        .sort((a, b) => a.position - b.position);
      column.splice(position, 0, movedTask);
      column.forEach((task, index) => {
        task.position = index;
      });
    },
  },
});

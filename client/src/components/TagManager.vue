<template>
  <section class="rounded-xl border border-border-default bg-bg-default p-5">
    <h2 class="mb-3 text-base font-semibold">Tags</h2>
    <p v-if="errorMessage" role="alert" class="mb-3 text-sm text-fg-danger">{{ errorMessage }}</p>

    <form class="flex items-stretch gap-2" @submit.prevent="saveTag">
      <input
        v-model="form.name"
        type="text"
        required
        maxlength="30"
        placeholder="Tag name"
        aria-label="Tag name"
        class="flex-1 rounded-md border border-border-default bg-bg-default px-3 py-1.5"
      />
      <input
        v-model="form.color"
        type="color"
        aria-label="Tag color"
        class="h-auto w-12 cursor-pointer rounded-md border border-border-default"
      />
      <button
        type="submit"
        class="cursor-pointer rounded-md bg-bg-primary-emphasis px-3 py-1.5 text-sm font-medium text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover"
      >
        {{ editingId === null ? 'Add tag' : 'Save tag' }}
      </button>
      <button
        v-if="editingId !== null"
        type="button"
        class="cursor-pointer rounded-md border border-border-default bg-bg-muted px-3 py-1.5 text-sm font-medium hover:bg-bg-muted-hover"
        @click="resetForm"
      >
        Cancel
      </button>
    </form>

    <ul class="mt-4 flex flex-col gap-2">
      <li v-for="tag in tasksStore.tags" :key="tag.id" class="flex items-center gap-2">
        <span class="size-3 rounded-full" :style="{ backgroundColor: tag.color }"></span>
        <span class="flex-1">{{ tag.name }}</span>
        <button
          type="button"
          class="cursor-pointer rounded-md px-2 py-1 text-sm hover:bg-bg-muted-hover"
          @click="editTag(tag)"
        >
          Edit
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-md px-2 py-1 text-sm text-fg-danger hover:bg-bg-danger-muted"
          @click="deleteTag(tag)"
        >
          Delete
        </button>
      </li>
    </ul>
    <p v-if="tasksStore.tags.length === 0" class="text-fg-muted">No tags yet.</p>
  </section>
</template>

<script>
import { useTasksStore } from '../stores/tasks.js';

const DEFAULT_COLOR = '#0969da';

export default {
  setup() {
    const tasksStore = useTasksStore();
    return {
      tasksStore,
    };
  },
  data() {
    return {
      editingId: null,
      form: { name: '', color: DEFAULT_COLOR },
      errorMessage: '',
    };
  },
  methods: {
    editTag(tag) {
      this.editingId = tag.id;
      this.form = { name: tag.name, color: tag.color };
    },
    resetForm() {
      this.editingId = null;
      this.form = { name: '', color: DEFAULT_COLOR };
    },
    async saveTag() {
      this.errorMessage = '';
      try {
        if (this.editingId === null) {
          await this.tasksStore.addTag(this.form);
        } else {
          await this.tasksStore.updateTag(this.editingId, this.form);
        }
        this.resetForm();
      } catch (error) {
        this.errorMessage = error.response?.data?.message ?? 'Cannot reach the server.';
      }
    },
    async deleteTag(tag) {
      if (!window.confirm(`Delete the tag "${tag.name}"? It is removed from its tasks.`)) {
        return;
      }
      this.errorMessage = '';
      try {
        await this.tasksStore.deleteTag(tag.id);
        this.resetForm();
      } catch (error) {
        this.errorMessage = error.response?.data?.message ?? 'Cannot reach the server.';
      }
    },
  },
};
</script>

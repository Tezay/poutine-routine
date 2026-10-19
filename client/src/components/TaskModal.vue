<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-fg-default/40 p-4"
    @keydown.esc="$emit('close')"
    @mousedown.self="$emit('close')"
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      tabindex="-1"
      class="max-h-[90vh] w-full max-w-xl overflow-y-auto outline-none rounded-lg border border-border-default bg-bg-default"
    >
      <header class="flex items-center justify-between border-b border-border-default px-6 py-4">
        <h2 id="task-modal-title" class="text-lg font-semibold">
          {{ task ? 'Edit task' : 'New task' }}
        </h2>
        <button
          type="button"
          aria-label="Close"
          class="flex size-9 items-center justify-center rounded-md text-2xl text-fg-muted hover:bg-bg-muted-hover"
          @click="$emit('close')"
        >
          &times;
        </button>
      </header>

      <form novalidate @submit.prevent="onSubmit">
        <div class="flex flex-col gap-4 px-6 py-4">
          <div class="flex flex-col gap-1">
            <label for="task-title" class="font-semibold">Title</label>
            <input
              id="task-title"
              ref="titleInput"
              v-model="form.title"
              type="text"
              maxlength="120"
              :aria-invalid="titleError !== ''"
              :aria-describedby="titleError ? 'task-title-error' : null"
              class="rounded-md border bg-bg-default px-3 py-2"
              :class="titleError ? 'border-border-danger' : 'border-border-default'"
            />
            <p v-if="titleError" id="task-title-error" role="alert" class="text-sm text-fg-danger">
              {{ titleError }}
            </p>
          </div>

          <div class="flex flex-col gap-1">
            <label for="task-description" class="font-semibold">Description</label>
            <textarea
              id="task-description"
              v-model="form.description"
              rows="3"
              class="rounded-md border border-border-default bg-bg-default px-3 py-2"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label for="task-status" class="font-semibold">Status</label>
              <select
                id="task-status"
                v-model="form.status"
                class="rounded-md border border-border-default bg-bg-default px-3 py-2"
              >
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label for="task-priority" class="font-semibold">Priority</label>
              <select
                id="task-priority"
                v-model="form.priority"
                class="rounded-md border border-border-default bg-bg-default px-3 py-2"
              >
                <option value="">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label for="task-due-date" class="font-semibold">Due date</label>
              <input
                id="task-due-date"
                v-model="form.dueDate"
                type="date"
                class="rounded-md border border-border-default bg-bg-default px-3 py-2"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label for="task-due-time" class="font-semibold">Due time</label>
              <input
                id="task-due-time"
                v-model="form.dueTime"
                type="time"
                :disabled="!form.dueDate"
                class="rounded-md border border-border-default bg-bg-default px-3 py-2 disabled:opacity-50"
              />
            </div>
          </div>

          <fieldset>
            <legend class="mb-1 font-semibold">Tags</legend>
            <div class="flex flex-wrap items-center gap-2">
              <label v-for="tag in tags" :key="tag.id" class="cursor-pointer">
                <input v-model="form.tagIds" type="checkbox" :value="tag.id" class="peer sr-only" />
                <span
                  class="flex items-center gap-1 rounded-full border border-border-default px-2.5 py-0.5 text-xs peer-checked:border-border-accent peer-checked:bg-bg-accent-muted peer-focus-visible:outline-2"
                >
                  <span class="size-2 rounded-full" :style="{ backgroundColor: tag.color }"></span>
                  {{ tag.name }}
                </span>
              </label>
            </div>
          </fieldset>
        </div>

        <div class="flex items-center border-t border-border-default bg-bg-muted px-6 py-4">
          <button
            v-if="task"
            type="button"
            class="rounded-md border border-border-danger px-3 py-1.5 text-sm font-medium text-fg-danger hover:bg-bg-danger-muted"
            @click="$emit('delete')"
          >
            Delete
          </button>
          <div class="ml-auto flex gap-2">
            <button
              type="button"
              class="rounded-md border border-border-default px-3 py-1.5 text-sm font-medium hover:bg-bg-muted-hover"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md bg-bg-primary-emphasis px-3 py-1.5 text-sm font-medium text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
function toInputValue(iso) {
  const date = new Date(iso);
  const localTime = date.getTime() - date.getTimezoneOffset() * 60000;
  return new Date(localTime).toISOString().slice(0, 16);
}

export default {
  props: {
    task: { type: Object, default: null },
    tags: { type: Array, required: true },
  },
  emits: ['close', 'save', 'delete'],
  data() {
    const source = this.task || {
      title: '',
      description: '',
      status: 'todo',
      priority: '',
      due_at: null,
      tags: [],
    };
    const due = source.due_at ? toInputValue(source.due_at) : '';
    return {
      form: {
        title: source.title,
        description: source.description || '',
        status: source.status,
        priority: source.priority || '',
        dueDate: due.slice(0, 10),
        dueTime: due.slice(11, 16),
        tagIds: source.tags.map((tag) => tag.id),
      },
      titleError: '',
    };
  },
  mounted() {
    this.$refs.titleInput.focus();
  },
  methods: {
    toDueAt() {
      const time = this.form.dueTime || '23:59';
      return new Date(`${this.form.dueDate}T${time}`).toISOString();
    },
    onSubmit() {
      const title = this.form.title.trim();
      if (title === '') {
        this.titleError = 'Title is required.';
        return;
      }
      this.$emit('save', {
        title,
        description: this.form.description.trim() || null,
        status: this.form.status,
        priority: this.form.priority || null,
        due_at: this.form.dueDate ? this.toDueAt() : null,
        tags: this.tags.filter((tag) => this.form.tagIds.includes(tag.id)),
      });
    },
  },
};
</script>

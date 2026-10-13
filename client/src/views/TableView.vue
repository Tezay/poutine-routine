<template>
    <AppTopbar title="My board" action-label="New task" />

    <div class="m-6 overflow-hidden rounded-lg border border-border-default bg-bg-default">
        <table class="w-full text-left text-sm">
            <thead class="border-b border-border-default bg-bg-muted text-xs font-medium text-fg-muted uppercase">
                <tr>
                    <th
                        v-for="column in columns"
                        :key="column.key"
                        class="px-6 py-3 cursor-pointer"
                        @click="sortBy(column.key)"
                    >
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border-default">
                <tr v-for="task in sortedTasks" :key="task.id" class="hover:bg-bg-muted-hover">
                    <td class="px-4 py-3 font-medium text-fg-default">
                        {{ task.title }}
                    </td>
                    <td class="px-4 py-3">
                        <span :class="['rounded-full px-2 py-0.5 text-xs font-bold', statusClass(task.status)]">
                            {{ statusLabel(task.status) }}
                        </span>
                    </td>
                    <td class="px-4 py-3">
                        <div class="flex flex-wrap gap-1">
                            <span 
                            v-for="tag in task.tags" 
                            :key="tag.id" 
                            class="rounded-full px-2.5 py-0.5 text-xs font-bold text-fg-default"
                            :style="{ backgroundColor: `color-mix(in srgb, ${tag.color} 20%, transparent)` }">
                                {{ tag.name }}
                            </span>
                        </div>
                    </td>
                    <td class="px-4 py-3 text-fg-muted">
                        <span :class ="['whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium', dueClass(task.due_at, task.status)]">
                            {{ formatDate(task.due_at) }}
                        </span>
                    </td>
                    <td class="px-4 py-3 text-fg-default capitalize">
                        {{ task.priority || '—' }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import AppTopbar from '../components/AppTopbar.vue';
import tasks from '../mock/tasks.js';

export default {
    components: {
        AppTopbar,
    },
    data() {
        return {
            tasks,
            sort_key: 'due_at',
            sortAscending: true,
            columns: [
                {key: 'title', label: 'Title'},
                {key: 'status', label: 'Status'},
                {key: 'tags', label: 'Tags'},
                {key: 'due_at', label: 'Due'},
                {key: 'priority', label: 'Priority'},
            ]
        };
    },
    computed: {
        sortedTasks(){
            return [...this.tasks].sort((a, b) => {
                let valA = a[this.sort_key];
                let valB = b[this.sort_key];

                if (this.sort_key === 'priority') {
                    const weight = { 'low': 1, 'medium': 2, 'high': 3 };
                    valA = weight[valA] || 0;
                    valB = weight[valB] || 0;
                }

                if (this.sort_key == 'tags') {
                    valA = a.tags.length;
                    valB = b.tags.length;
                }

                if (valA === valB) return 0;

                if (valA === null || valA === undefined) return 1;
                if (valB === null || valB === undefined) return -1;

                const comparison = valA > valB ? 1 : -1;
                return this.sortAscending ? comparison : -comparison;
            });
        }
    },
    methods: {
        sortBy(key) {
            if (this.sort_key === key) {
                this.sortAscending = !this.sortAscending;
            } else {
                this.sort_key = key;
                this.sortAscending = true;
            }
        },
        statusClass(status) {
            const map = {
                todo: 'bg-bg-success-muted text-fg-success',
                doing: 'bg-bg-attention-muted text-fg-attention',
                done: 'bg-bg-done-muted text-fg-done',
            };
            return map[status] || '';
        },
        statusLabel(status) {
            const map = { todo: 'To Do', doing: 'Doing', done: 'Done' };
            return map[status] || status;
        },
        formatDate(dateString) {
            if (!dateString) return '—';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        },
        dueClass(dateString, status) {
            if (!dateString) return 'bg-bg-muted text-fg-muted';
            if (status === 'doing') return 'bg-bg-attention-muted text-fg-attention';
            return 'bg-bg-muted text-fg-muted';
        }
    },
};
</script>
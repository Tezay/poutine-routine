<template>
  <section class="rounded-xl border border-border-default bg-bg-default p-5">
    <h2 class="mb-3 text-base font-semibold">Appearance</h2>
    <div
      role="group"
      aria-label="Theme"
      class="inline-flex gap-0.5 rounded-md border border-border-default bg-bg-muted p-0.5"
    >
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :aria-pressed="theme === option.value"
        class="cursor-pointer rounded px-3 py-1 text-sm"
        :class="
          theme === option.value
            ? 'bg-bg-default font-semibold shadow-sm'
            : 'text-fg-muted hover:bg-bg-muted-hover'
        "
        @click="setTheme(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // Values of the CSS color-scheme property
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'System', value: 'light dark' },
      ],
      theme: localStorage.getItem('theme') ?? 'light dark',
    };
  },
  methods: {
    setTheme(value) {
      this.theme = value;
      localStorage.setItem('theme', value);
      document.documentElement.style.colorScheme = value;
    },
  },
};
</script>

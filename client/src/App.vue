<template>
  <main
    v-if="$route.meta.layout === 'auth'"
    class="flex min-h-screen items-center justify-center bg-bg-muted p-4"
  >
    <router-view />
  </main>
  <div
    v-else
    class="grid h-screen grid-cols-[var(--sidebar-width)_minmax(0,1fr)_var(--rail-width)] grid-rows-1"
  >
    <AppSidebar />
    <main class="overflow-y-auto">
      <router-view />
    </main>
    <CompanionRail />
  </div>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue';
import CompanionRail from './components/CompanionRail.vue';

export default {
  components: {
    AppSidebar,
    CompanionRail,
  },
};
</script>

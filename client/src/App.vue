<template>
  <div class="grid min-h-screen grid-cols-[var(--sidebar-width)_minmax(0,1fr)_var(--rail-width)]">
    <AppSidebar />
    <main>
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

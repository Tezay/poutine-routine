<template>
  <AppTopbar title="Home View" action-label="Romanifier" />
  <div class="flex justify-center p-6">
    <div class="text-center">
      <h2 class="font-pixel text-2xl">Poutine Routine</h2>
      <p class="mt-2 text-fg-muted">Client scaffold, work in progress.</p>
    </div>
  </div>
</template>

<script>
import AppTopbar from '../components/AppTopbar.vue';
export default {
  components: {
    AppTopbar,
  },
};
</script>

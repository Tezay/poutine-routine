<template>
  <img :src="src" alt="" class="[image-rendering:pixelated]" />
</template>

<script>
export default {
  props: {
    poutine: { type: Object, required: true },
  },
  computed: {
    src() {
      return new URL(`../assets/poutines/${this.poutine.slug}.png`, import.meta.url).href;
    },
  },
};
</script>

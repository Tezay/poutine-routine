<template>
  <img :src="src" alt="" class="[image-rendering:pixelated]" />
</template>

<script>
export default {
  props: {
    slug: { type: String, required: true },
  },
  computed: {
    src() {
      return new URL(`../assets/poutines/${this.slug}.png`, import.meta.url).href;
    },
  },
};
</script>

<template>
  <PoutineSprite :slug="slug" />
</template>

<script>
import PoutineSprite from './PoutineSprite.vue';

const colors = [
  'beige',
  'burgundy',
  'cyan',
  'kaki',
  'marine',
  'orange',
  'pink',
  'rouge',
  'taupe',
  'yellow',
];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
const slug = `simple-poutine-${randomColor}`;

export default {
  components: {
    PoutineSprite,
  },
  data() {
    return {
      slug,
    };
  },
};
</script>

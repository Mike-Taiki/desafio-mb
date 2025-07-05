<script setup>
import { headingOptionsEnum } from "./types.js";
const props = defineProps({
  level: {
    type: String,
    default: headingOptionsEnum.MD,
    validator: (value) => [headingOptionsEnum.MD].includes(value),
  },
});

const classes = {
  heading: true,
  [`heading-${props.level}`]: true,
};
</script>
<template>
  <h1 :class="classes">
    <slot></slot>
  </h1>
</template>
<style lang="scss" scoped>
.heading {
  &-lg {
    font-size: $text-lg;
    color: $text-black;
  }
}
</style>

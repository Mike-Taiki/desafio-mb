<script setup>
import { computed } from "vue";
import { ButtonTypesEnum } from "./types.js";

const props = defineProps({
  style: {
    type: String,
    default: ButtonTypesEnum.PRIMARY,
  },
});

const classes = computed(() => {
  return ["button", `button__${props.style}`];
});
</script>
<template>
  <button type="button" :class="classes" v-on="$attrs">
    <slot></slot>
  </button>
</template>
<style lang="scss" scoped>
.button {
  padding: $padding-1;
  border-radius: $radius-1;
  border: $border-orange-1;

  &__primary {
    background-color: $bg-orange;
    color: $text-white;
  }

  &__secondary {
    background-color: $bg-white;
    color: $text-orange;
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>

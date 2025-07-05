<script setup>
const props = defineProps({
  currentStep: {
    type: Number,
    default: 1,
  },
  totalSteps: {
    type: Number,
    default: 5,
  },
});
</script>
<template>
  <span class="step"
    >Etapa <span class="step__current">{{ props.currentStep }}</span> de
    {{ props.totalSteps }}
  </span>
</template>
<style lang="scss" scoped>
.step {
  &__current {
    color: $text-orange;
  }
}
</style>

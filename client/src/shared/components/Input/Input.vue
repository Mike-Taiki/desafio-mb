<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <input class="input" type="text" :value="modelValue" />
</template>
<style lang="scss" scoped>
.input {
  border: $border-1;
  border-radius: $radius-1;
  padding: $padding-1;
  min-width: 250px;
}
</style>

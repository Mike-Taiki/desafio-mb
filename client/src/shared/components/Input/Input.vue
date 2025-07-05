<script setup>
import { useAttrs, useTemplateRef } from "vue";

const attrs = useAttrs();
const inputRef = useTemplateRef("input");
const model = defineModel({ required: true });

defineProps({
  label: {
    type: String,
    default: "",
  },
});

const clickLabel = () => {
  inputRef.value.focus();
};
</script>
<template>
  <div class="form-field">
    <label
      v-if="label"
      class="form-field__label"
      :for="attrs.id"
      @click="clickLabel"
      >{{ label }}</label
    >
    <input
      ref="input"
      class="form-field__input"
      v-model="model"
      v-bind="attrs"
    />
  </div>
</template>
<style lang="scss" scoped>
.form-field {
  display: flex;
  max-width: 50%;
  flex-wrap: wrap;
  flex-basis: 250px;

  &__label {
    width: 100%;
    color: $text-black;
    font-size: $text-md;
    margin-bottom: 0.5rem;
  }

  &__input {
    width: 100%;
    border: $border-1;
    border-radius: $radius-1;
    padding: $padding-1;
  }
}
</style>

<script setup>
import { useAttrs, useTemplateRef } from "vue";

const attrs = useAttrs();
const inputRef = useTemplateRef("input");
const model = defineModel({ required: true });
const randomId = Math.random().toString(36).slice(2, 9);
const inputId = attrs.id ? "input-" + attrs.id + randomId : "input-" + randomId;

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
      :for="inputId"
      @click="clickLabel"
      >{{ label }}</label
    >
    <input
      ref="input"
      class="form-field__input"
      :id="inputId"
      v-model="model"
    />
  </div>
</template>
<style lang="scss" scoped>
.form-field {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;

  &__label {
    width: 100%;
    color: $text-black;
    font-size: $text-md;
    margin-bottom: $margin-1;
  }

  &__input {
    width: 100%;
    border: $border-black;
    border-radius: $radius-1;
    padding: $padding-1;
    box-sizing: border-box;
  }
}
</style>

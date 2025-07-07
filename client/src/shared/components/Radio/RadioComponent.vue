<script setup>
import { defineModel, useAttrs, useTemplateRef } from "vue";
const attrs = useAttrs();
const inputRef = useTemplateRef("input");
const model = defineModel({ required: true, type: [String, Number, Boolean] });
const randomId = Math.random().toString(36).slice(2, 9);
const inputId = attrs.id ? "input-" + attrs.id + randomId : "input-" + randomId;

defineProps({
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
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
    <input
      :id="inputId"
      ref="input"
      v-model="model"
      type="radio"
      :value="value"
      v-on="$attrs"
    />
    <label :for="inputId" @click="clickLabel">{{ label }}</label>
  </div>
</template>
<style lang="scss" scoped>
.form-field {
  display: flex;
  gap: $margin-1;
}
</style>

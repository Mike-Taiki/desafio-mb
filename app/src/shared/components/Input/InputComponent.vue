<script setup>
import { useAttrs, useTemplateRef } from "vue";
import { InputTypesEnum } from "./types";

const attrs = useAttrs();
const inputRef = useTemplateRef("input");
const model = defineModel({ required: true, type: String });
const randomId = Math.random().toString(36).slice(2, 9);
const inputId = attrs.id ? "input-" + attrs.id + randomId : "input-" + randomId;

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: InputTypesEnum.TEXT,
    validator: (value) => {
      const validTypes = Object.values(InputTypesEnum);
      if (!validTypes.includes(value)) {
        throw new Error(`Invalid input type: ${value}. Valid types are: ${validTypes.join(", ")}`);
      }
      return true;
    },
  }
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
      :id="inputId"
      ref="input"
      v-model="model"
      :type="props.type"
      :maxlength="attrs.maxlength"
      class="form-field__input"
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
  cursor: pointer;

  &__label {
    width: 100%;
    color: $text-black;
    font-size: $text-md;
    margin-bottom: $margin-1;
  }

  &__input {
    width: 100%;
    border: $border-black-1;
    border-radius: $radius-1;
    padding: $padding-1;
    box-sizing: border-box;
  }
}
</style>

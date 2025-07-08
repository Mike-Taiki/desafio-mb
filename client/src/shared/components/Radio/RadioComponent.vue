<script setup>
import { defineModel, useAttrs } from "vue";
const attrs = useAttrs();
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
</script>
<template>
  <label class="form-field" :for="inputId" >{{ label }}
    <input
      :id="inputId"
      ref="input"
      v-model="model"
      class="form-field__input-radio"
      type="radio"
      :value="value"
      v-on="$attrs"
    />
    <span class="checkmark"></span>
  </label>
</template>
<style lang="scss" scoped>
.form-field {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default radio button */
  &__input-radio {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: $border-gray-2;
  }

  /* On mouse-over, add a black border color */
  &:hover .form-field__input-radio ~ .checkmark {
    border: $border-black-2;
  }

  /* When the radio button is checked, add a blue background */
  .form-field__input-radio:checked ~ .checkmark {
    background-color: $bg-white;
  }

  /* Create the indicator (the dot/circle) */
  .checkmark:after {
    content: "";
    position: absolute;
    border: $border-gray-2;
  }

  /* Show the indicator (dot/circle) when checked */
  .form-field__input-radio:checked ~ .checkmark:after {
    display: block;
    background-color: $bg-black;
  }

  /* Style the indicator (dot/circle) */
  .checkmark:after {
    top: 2px;
    left: 2px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
      
  }
}

</style>

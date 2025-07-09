<script setup>
import { ref } from "vue";
import InputComponent from '../../../shared/components/Input/InputComponent.vue';

const password = ref("");
const emit = defineEmits(["inputPassword"]);

const handleInputPassword = (event) => {
  emit("inputPassword", event.target.value);
};
</script>
<template>
  <InputComponent
    v-model="password"
    type="password"
    @keyup="handleInputPassword"
  />
</template>
<script setup>
import { ref } from "vue";
import InputComponent from '../../../shared/components/Input/InputComponent.vue';

const emit = defineEmits(["inputPassword"]);

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
});
const password = ref(props.password);

const handleInputPassword = (event) => {
  emit("inputPassword", event.target.value);
};
</script>
<template>
  <InputComponent
    v-model="password"
    type="password"
    :maxlength="6"
    @keyup="handleInputPassword"
  />
</template>
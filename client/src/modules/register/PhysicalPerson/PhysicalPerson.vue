<script setup lang="ts">
import InputComponent from "@/shared/components/Input/InputComponent.vue";
import { maskCpf } from "@/shared/helpers/maskCpf.js";
import { maskTelephone } from "@/shared/helpers/maskTel.js";
import { defineEmits, defineProps, ref } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  }
});
const typedName = ref(props.name);
const typedCpf = ref(props.cpf);
const typedBirthDate = ref(props.birthDate);
const typedTelephone = ref(props.telephone);
const emit = defineEmits(["inputName", "inputCpf", "inputBirthDate", "inputTelephone"]);

const handleInputName = (event) => {
  emit("inputName", event.target.value);
};

const handleInputCpf = (event) => {
  typedCpf.value = maskCpf(event.target.value);
};

const handleInputBirthdate = (event) => {
  emit("inputBirthDate", event.target.value);
}

const handleInputTelephone = (event) => {
  const telephoneValue = event.target.value;
  typedTelephone.value = maskTelephone(telephoneValue);
  emit("inputTelephone", telephoneValue);
};
</script>
<template>
  <InputComponent 
    v-model="typedName"
    class="register__input" 
    label="Nome" 
    @keyup="handleInputName"
  />
  <InputComponent 
    v-model="typedCpf"
    class="register__input" 
    label="CPF" 
    :maxlength="14"
    @keyup="handleInputCpf"
  />
  <InputComponent 
    v-model="typedBirthDate"
    type="date"
    class="register__input" 
    label="Data de nascimento" 
    @keyup="handleInputBirthdate"
  />
  <InputComponent 
  v-model="typedTelephone"
    class="register__input" 
    label="Telefone" 
    type="tel"  
    :maxlength="13"
    @keyup="handleInputTelephone"
  />
</template>
<style lang="scss" scoped>
.register {
  &__input {
    margin-bottom: $margin-3;
  }
}
</style>
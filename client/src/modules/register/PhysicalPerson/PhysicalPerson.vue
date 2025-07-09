<script setup lang="ts">
import InputComponent from "@/shared/components/Input/InputComponent.vue";
import { ref } from "vue";
const name = ref("");
const cpf = ref("");
const birthDate = ref("");
const telephone = ref("");
const emit = defineEmits(["inputName", "inputCpf", "inputBirthdate", "inputTelephone"]);

/** @param {Event} event - The input name event.
 *  @description This function is called when the name input changes.
 */
const handleInputName = (event) => {
  name.value = event.target.value;
  emit("inputName", name.value);
};

/** @param {Event} event - The input cpf event.
 *  @description This function is called when the cpf input changes.
 */
const handleInputCpf = (event) => {
  cpf.value = event.target.value;
  emit("inputCpf", cpf.value);
};

/** @param {Event} event - The input birthdate event.
 *  @description This function is called when the birthdate input changes.
 */
const handleInputBirthdate = (event) => {
  const birthdate = event.target.value;
  // Validate birthdate format (DD/MM/YYYY)
  const birthdateRegex = /^(0[1-9]|[12][0-9])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (birthdateRegex.test(birthdate)) {
    emit("inputBirthdate", birthdate);
  } else {
    console.error("Invalid birthdate format. Please use DD/MM/YYYY.");
  }
}

const handleInputTelephone = (event) => {
  const telephoneValue = event.target.value;
  // Validate telephone format (Brazilian format)
  const telephoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  if (telephoneRegex.test(telephoneValue)) {
    emit("inputTelephone", telephoneValue);
  } else {
    console.error("Invalid telephone format. Please use (XX) XXXX-XXXX or (XX) XXXXX-XXXX.");
  }
};
</script>
<template>
  <InputComponent 
    v-model="name"
    class="register__input" 
    label="Nome" 
    @keyup="handleInputName"
  />
  <InputComponent 
    v-model="cpf"
    class="register__input" 
    label="CPF" 
    @keyup="handleInputCpf"
  />
  <InputComponent 
    v-model="birthDate"
    type="date"
    class="register__input" 
    label="Data de nascimento" 
    @keyup="handleInputBirthdate"
  />
  <InputComponent 
  v-model="telephone"
    class="register__input" 
    label="Telefone" 
    type="tel"  
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
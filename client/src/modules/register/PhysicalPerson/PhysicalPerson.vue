<script setup lang="ts">
import InputComponent from "@/shared/components/Input/InputComponent.vue";
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
  emit("inputCpf", event.target.value);
};

const handleInputBirthdate = (event) => {
  const birthdate = event.target.value;
  // Validate birthdate format (DD/MM/YYYY)
  const birthdateRegex = /^(0[1-9]|[12][0-9])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (birthdateRegex.test(birthdate)) {
    emit("inputBirthDate", birthdate);
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
    v-model="typedName"
    class="register__input" 
    label="Nome" 
    @keyup="handleInputName"
  />
  <InputComponent 
    v-model="typedCpf"
    class="register__input" 
    label="CPF" 
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
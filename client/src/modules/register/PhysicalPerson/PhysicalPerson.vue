<script setup>
import InputComponent from "@/shared/components/Input/InputComponent.vue";
import { maskCpf } from "@/shared/helpers/maskCpf.js";
import { maskTelephone } from "@/shared/helpers/maskTel.js";
import { defineProps, ref } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  nameLabel: {
    type: String,
    default: "Nome"
  },
  document: {
    type: String,
    required: true
  },
  documentLabel: {
    type: String,
    default: "CPF"
  },
  date: {
    type: String,
    required: true
  },
  dateLabel: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  hasInputPassword: {
    type: Boolean,
    default: false
  }
});
const typedName = ref(props.name);
const typedCpf = ref(props.cpf);
const typedBirthDate = ref(props.birthDate);
const typedTelephone = ref(props.telephone);
const typedPassword = ref(props.password);
const emit = defineEmits(["inputName", "inputDocument", "inputDate", "inputTelephone", "inputPassword"]);

const handleInputName = (event) => {
  emit("inputName", event.target.value);
};

const handleInputCpf = (event) => {
  typedCpf.value = maskCpf(event.target.value);
  emit("inputDocument", typedCpf.value);
};

const handleInputBirthdate = (event) => {
  emit("inputDate", event.target.value);
}

const handleInputTelephone = (event) => {
  const telephoneValue = event.target.value;
  typedTelephone.value = maskTelephone(telephoneValue);
  emit("inputTelephone", typedTelephone.value);
};

const handleInputPassword = (event) => {
  emit("inputPassword", event.target.value);
};
</script>
<template>
  <InputComponent 
    v-model="typedName"
    class="register__input" 
    :label="props.nameLabel" 
    @keyup="handleInputName"
  />
  <InputComponent 
    v-model="typedCpf"
    class="register__input" 
    :label="documentLabel" 
    :maxlength="14"
    @keyup="handleInputCpf"
  />
  <InputComponent 
    v-model="typedBirthDate"
    type="date"
    class="register__input" 
    :label="props.dateLabel" 
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
  <InputComponent 
  v-if="hasInputPassword"
  v-model="typedPassword"
    class="register__input" 
    label="Senha" 
    type="password"  
    :maxlength="6"
    @keyup="handleInputPassword"
  />
</template>
<style lang="scss" scoped>
.register {
  &__input {
    margin-bottom: $margin-3;
  }
}
</style>
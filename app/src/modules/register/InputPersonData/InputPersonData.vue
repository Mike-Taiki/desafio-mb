<script setup>
import InputComponent from "@/shared/components/Input/InputComponent.vue";
import { maskCpf } from "@/shared/helpers/maskCpf.js";
import { maskCnpj } from "@/shared/helpers/maskCnpj.js";
import { maskTelephone } from "@/shared/helpers/maskTel.js";
import { defineProps, ref } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  nameLabel: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  },
  documentLabel: {
    type: String,
    required: true
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
  },
  isPhysicalPerson: {
    type: Boolean,
    required: true
  }
});
const typedName = ref(props.name);
const typedCpf = ref(props.document);
const typedBirthDate = ref(props.date);
const typedTelephone = ref(props.telephone);
const typedPassword = ref(props.password);
const emit = defineEmits(["inputName", "inputDocument", "inputDate", "inputTelephone", "inputPassword"]);

const handleInputName = (event) => {
  emit("inputName", event.target.value);
};

const handleInputCpf = (event) => {
  if (props.isPhysicalPerson) {
    const { maskedCpf, unmaskedCpf } = maskCpf(event.target.value);
    typedCpf.value = maskedCpf;
    emit("inputDocument", {maskedDocument: maskedCpf, unmaskedDocument: unmaskedCpf});
  } else {
    const { maskedCnpj, unmaskedCnpj } = maskCnpj(event.target.value);
    typedCpf.value = maskedCnpj;
    emit("inputDocument", {maskedDocument: maskedCnpj, unmaskedDocument: unmaskedCnpj});
  }
};

const handleInputBirthdate = (event) => {
  emit("inputDate", event.target.value);
}

const handleInputTelephone = (event) => {
  const telephoneValue = event.target.value;
  const { maskedTelephone, unmaskedTelephone } = maskTelephone(telephoneValue);
  typedTelephone.value = maskedTelephone;
  emit("inputTelephone", {maskedTelephone, unmaskedTelephone});
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
    :maxlength="props.isPhysicalPerson ? 14 : 18"
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
    :maxlength="15"
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
<script setup>
import { PersonTypeEnum } from "@/modules/register/types.js";
import InputComponent from "@/shared/components/Input/InputComponent.vue";
import RadioComponent from "@/shared/components/Radio/RadioComponent.vue";
import { ref } from "vue";

const personTypeOptions = [
  {
    value: PersonTypeEnum.PHYSICAL,
    label: "Pessoa fisica",
    id: "pessoa_fisica",
  },
  {
    value: PersonTypeEnum.LEGAL,
    label: "Pessoa jurídica",
    id: "pessoa_juridica",
  },
];

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  selectedPerson: {
    type: Number,
    required: true,
  }
});
const typedEmail = ref(props.email);
const selectedOption = ref(props.selectedPerson);

const emit = defineEmits(["selectedPersonType", "inputEmail"]);

/** @param {Event} event - The selected person radio event.
 * @description This function is called when the radio button selection changes.
 */
const handleSelectPersonChange = (event) => {
  emit("selectedPersonType", parseInt(event.target.value));
};

const handleInputEmail = (event) => {
  emit("inputEmail", event.target.value);
};
</script>

<template>
  <InputComponent 
    id="email" 
    v-model="typedEmail" 
    type="email" 
    class="register__input" 
    label="Endereço de e-mail" 
    @keyup="handleInputEmail"
  />
  <div class="register-person-type">
    <RadioComponent
      v-for="option in personTypeOptions" 
      :key="option.value" 
      v-model="selectedOption"
      :value="option.value" 
      :label="option.label" 
      @change="handleSelectPersonChange" />
  </div>
</template>
<style lang="scss" scoped>
.register {
  &__input {
    margin-bottom: $margin-3;
  }

  &-person-type {
    display: flex;
    flex-wrap: wrap;

    &> :nth-child(n + 1) {
      margin-right: $margin-3;
    }
  }
}
</style>

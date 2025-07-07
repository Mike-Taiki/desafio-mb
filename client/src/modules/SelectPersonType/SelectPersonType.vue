<script setup>
import { PersonTypeEnum } from "@/modules/register/types.js";
import InputComponent from "@/shared/components/Input/InputComponent.vue";
import RadioComponent from "@/shared/components/Radio/RadioComponent.vue";
import { ref } from "vue";

const name = ref("");
const selectedOption = ref("");
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

const emit = defineEmits(["selectedPersonType"]);

/** @param {Event} event - The selected person radio event.
 * This function is called when the radio button selection changes.
 */
const handleChange = (event) => {
  selectedOption.value = event.target.value;
  emit("selectedPersonType", event);
};
</script>

<template>
  <InputComponent id="email" v-model="name" class="register__input" label="Endereço de e-mail" />
  <div class="register-person-type">
    <RadioComponent
v-for="option in personTypeOptions" :id="option.id" :key="option.value" v-model="selectedOption"
      :value="option.value" :label="option.label" @change="handleChange" />
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
    margin-bottom: $margin-3;

    &> :nth-child(n + 1) {
      margin-right: $margin-3;
    }
  }
}
</style>

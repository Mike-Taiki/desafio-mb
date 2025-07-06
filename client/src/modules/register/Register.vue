<script setup>
import { ref } from "vue";
import { headingOptionsEnum } from "@/shared/components/Heading/types.js";
import { StepsEnum, PersonTypeEnum } from "@/modules/register/types.js";
import Step from "@/shared/components/Step/Step.vue";
import SelectPersonType from "@/modules/SelectPersonType/SelectPersonType.vue";
import Heading from "@/shared/components/Heading/Heading.vue";
import Button from "@/shared/components/Button/Button.vue";

const totalSteps = ref(5);
const currentStep = ref(StepsEnum.PERSON_TYPE);
const selectedPersonType = ref(null);
const steps = {
  [StepsEnum.PERSON_TYPE]: "Seja bem vindo(a)",
  [StepsEnum.INSERT_DATA]:
    selectedPersonType.value === PersonTypeEnum.PHYSICAL
      ? "Pessoa Física"
      : "Pessoa Jurídica",
  [StepsEnum.PASSWORD]: "Senha de acesso",
  [StepsEnum.CONFIRM_DATA]: "Revise suas informações",
};
/**
 * Selects the person.
 * @param {PersonTypeEnum} selectedPersonType - The selected person type.
 * @type {function}
 **/
const selectPersonType = (selectedPersonType) => {
  selectedPersonType.value = selectedPersonType;
};
</script>

<template>
  <section class="register">
    <Step
      class="register__step"
      :current-step="currentStep"
      :total-steps="totalSteps"
    />
    <Heading class="register__heading" :level="headingOptionsEnum.MD">{{
      steps[currentStep]
    }}</Heading>
    <SelectPersonType @selectedPersonType="selectPersonType" />
    <Button class="register__button" @click="currentStep++">Continuar</Button>
  </section>
</template>
<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;

  &__step {
    margin-bottom: $margin-1;
  }

  &__heading {
    margin-bottom: $margin-6;
  }
}
</style>

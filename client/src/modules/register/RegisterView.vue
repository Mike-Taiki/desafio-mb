<script setup>
import { PersonTypeEnum, StepsEnum } from "@/modules/register/types.js";
import SelectPersonType from "@/modules/SelectPersonType/SelectPersonType.vue";
import ButtonComponent from "@/shared/components/Button/ButtonComponent.vue";
import HeadingComponent from "@/shared/components/Heading/HeadingComponent.vue";
import { headingOptionsEnum } from "@/shared/components/Heading/types.js";
import StepComponent from "@/shared/components/Step/StepComponent.vue";
import { ref } from "vue";

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
/**  * Selects the person.  * @param {PersonTypeEnum} selectedPersonType - The selected person type.  * @type {function}  **/
const selectPersonType = (selectedPersonType) => {
  selectedPersonType.value = selectedPersonType;
};
</script>

<template>
  <section class="register">
    <StepComponent class="register__step" :current-step="currentStep" :total-steps="totalSteps" />
    <HeadingComponent class="register__heading" :level="headingOptionsEnum.MD">
      {{ steps[currentStep] }}
    </HeadingComponent>
    <SelectPersonType @selected-person-type="selectPersonType" />
    <ButtonComponent class="register__button" @click="currentStep++">
      Continuar
    </ButtonComponent>
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

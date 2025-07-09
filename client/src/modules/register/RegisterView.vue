<script setup>
import PhysicalPerson from "@/modules/register/PhysicalPerson/PhysicalPerson.vue";
import SelectPersonType from "@/modules/register/SelectPersonType/SelectPersonType.vue";
import { PersonTypeEnum, StepsEnum } from "@/modules/register/types.js";
import ButtonComponent from "@/shared/components/Button/ButtonComponent.vue";
import HeadingComponent from "@/shared/components/Heading/HeadingComponent.vue";
import { headingOptionsEnum } from "@/shared/components/Heading/types.js";
import StepComponent from "@/shared/components/Step/StepComponent.vue";
import { computed, ref } from "vue";

const totalSteps = ref(5);
const currentStep = ref(StepsEnum.PERSON_TYPE);

/**
 * 
 * @param email - The email to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 * @type {function}
 * @description Validates the email format using a regular expression.
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isFirstStepValid = computed(() => {
  const isEmailValid = validateEmail(steps.value[currentStep.value].email);
  const isPersonTypeSelected = steps.value[currentStep.value].selectedPersonType !== null;
  return isEmailValid && isPersonTypeSelected;
})

const steps = ref({
  [StepsEnum.PERSON_TYPE]: {
    title: () => "Seja bem vindo(a)",
    email: "",
    selectedPersonType: null,
    isValid: isFirstStepValid
  },
  [StepsEnum.INSERT_DATA]: {
    title: () => isPhysicalPerson() ? "Pessoa Física" : "Pessoa Jurídica",
    isValid: true,
  },
  [StepsEnum.PASSWORD]: {
    title: () => "Senha de acesso",
    isValid: true,
  },
  [StepsEnum.CONFIRM_DATA]: {
    title: () => "Revise suas informações",
    isValid: true,
  }
});

/**  * Selects the person.  * @param {PersonTypeEnum} selectedPersonType - The selected person type.  * @type {function}  **/
function selectPersonType(selectedPersonType) {
  steps.value[currentStep.value].selectedPersonType = selectedPersonType;
};


function inputEmail(email) {
  steps.value[currentStep.value].email = email;
};

/**
 * Checks if the selected person type is a physical person.
 * @returns {boolean} - Returns true if the selected person type is physical, otherwise false.
 * @type {function}
 * @description Determines if the selected person type is a physical person.
 */
function isPhysicalPerson() {
  console.log("selectedPersonType", steps.value[StepsEnum.PERSON_TYPE].selectedPersonType);
  console.log("physical", PersonTypeEnum.PHYSICAL);
  console.log("isPhysicalPerson", steps.value[StepsEnum.PERSON_TYPE].selectedPersonType === PersonTypeEnum.PHYSICAL);
  return steps.value[StepsEnum.PERSON_TYPE].selectedPersonType === PersonTypeEnum.PHYSICAL;
};

</script>

<template>
  <section class="register">
    <StepComponent class="register__step" :current-step="currentStep" :total-steps="totalSteps" />
    <HeadingComponent class="register__heading" :level="headingOptionsEnum.MD">
      {{ steps[currentStep].title() }}
    </HeadingComponent>
    <SelectPersonType v-if="currentStep === 1" @selected-person-type="selectPersonType" @input-email="inputEmail" />
    <PhysicalPerson v-else-if="currentStep === 2" />
    <ButtonComponent class="register__button" :disabled="!steps[currentStep].isValid" @click="currentStep++">
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

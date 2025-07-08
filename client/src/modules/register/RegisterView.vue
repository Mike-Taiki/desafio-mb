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
const steps = ref({
  [StepsEnum.PERSON_TYPE]: {
    title: "Seja bem vindo(a)",
    email: "",
    selectedPersonType: selectedPersonType.value,
    validationNextCallback: handleFirstStepValidation,
    isButtonDisabled: true,
  },
  [StepsEnum.INSERT_DATA]: {
    title: isPhysicalPerson() ? "Pessoa Física" : "Pessoa Jurídica",
    validationNextCallback: validateEmail,
    isButtonDisabled: true,
  },
  [StepsEnum.PASSWORD]: {
    title: "Senha de acesso",
    validationNextCallback: validateEmail,
    isButtonDisabled: true,
  },
  [StepsEnum.CONFIRM_DATA]: {
    title: "Revise suas informações",
    validationNextCallback: validateEmail,
    isButtonDisabled: true,
  }
});

/**  * Selects the person.  * @param {PersonTypeEnum} selectedPersonType - The selected person type.  * @type {function}  **/
function selectPersonType(selectedPersonType) {
  steps.value[currentStep.value].selectedPersonType = selectedPersonType;
  handleNextStep();
};


function inputEmail(email) {
  steps.value[currentStep.value].email = email;
  handleNextStep();
};

/**
 * Checks if the selected person type is a physical person.
 * @returns {boolean} - Returns true if the selected person type is physical, otherwise false.
 * @type {function}
 * @description Determines if the selected person type is a physical person.
 */
function isPhysicalPerson() {
  return selectedPersonType.value === PersonTypeEnum.PHYSICAL;
};

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

/**
 * @param {Event} event - The current step number.
 * @description Handles the next step in the registration process.
 */
function handleNextStep() {
  const isValid = steps.value[currentStep.value].validationNextCallback();
  if (isValid) {
    setIsNextButtonDisabled(false);
  } else {
    setIsNextButtonDisabled(true);
  }
}

function handleFirstStepValidation() {
  const isEmailValid = validateEmail(steps.value[currentStep.value].email);
  const isPersonTypeSelected = steps.value[currentStep.value].selectedPersonType !== null;
  if (isEmailValid && isPersonTypeSelected) {
    return true;
  }
  return false;
}

/**
 * 
 * @param {boolean} isValid - Indicates whether the current step is valid.
 * @description Toggles the disabled state of the button based on the validity of the current step
 */
function setIsNextButtonDisabled(isValid) {
  steps.value[currentStep.value].isButtonDisabled = isValid;
}
</script>

<template>
  <section class="register">
    <StepComponent class="register__step" :current-step="currentStep" :total-steps="totalSteps" />
    <HeadingComponent class="register__heading" :level="headingOptionsEnum.MD">
      {{ steps[currentStep].title }}
    </HeadingComponent>
    <SelectPersonType @selected-person-type="selectPersonType" @input-email="inputEmail" />
    <ButtonComponent class="register__button" :disabled="steps[currentStep].isButtonDisabled" @click="currentStep++">
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

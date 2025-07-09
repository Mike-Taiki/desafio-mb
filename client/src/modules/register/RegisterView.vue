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
 * @param {string} email - The email to validate.
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
    isValid: isFirstStepValid,
    hasBackButton: false,
  },
  [StepsEnum.INSERT_DATA]: {
    title: () => isPhysicalPerson() ? "Pessoa Física" : "Pessoa Jurídica",
    isValid: false,
    hasBackButton: true,
  },
  [StepsEnum.PASSWORD]: {
    title: () => "Senha de acesso",
    isValid: false,
    hasBackButton: true,
  },
  [StepsEnum.CONFIRM_DATA]: {
    title: () => "Revise suas informações",
    isValid: false,
    hasBackButton: false,
  }
});

/**
 * Checks if the selected person type is a physical person.
 * @returns {boolean} - Returns true if the selected person type is physical, otherwise false.
 * @type {function}
 * @description Determines if the selected person type is a physical person.
 */
function isPhysicalPerson() {
  return steps.value[StepsEnum.PERSON_TYPE].selectedPersonType === PersonTypeEnum.PHYSICAL;
};


function handleSelectedPersonType(selectedPersonType) {
  steps.value[StepsEnum.PERSON_TYPE].selectedPersonType = selectedPersonType;
};

function handleInputEmail(email) {
  steps.value[StepsEnum.PERSON_TYPE].email = email;
};

function goBack() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

</script>

<template>
  <section class="register">
    <StepComponent class="register__step" :current-step="currentStep" :total-steps="totalSteps" />
    <HeadingComponent class="register__heading" :level="headingOptionsEnum.MD">
      {{ steps[currentStep].title() }}
    </HeadingComponent>
    <SelectPersonType v-if="currentStep === 1" :selected-person="steps[currentStep].selectedPersonType" :email="steps[currentStep].email" @input-email="handleInputEmail" @selected-person-type="handleSelectedPersonType" />
    <PhysicalPerson v-else-if="currentStep === 2" />
    <div class="register-buttons">
      <ButtonComponent v-if="steps[currentStep].hasBackButton" class="register__button" style-type="secondary" :disabled="currentStep === 1" @click="goBack">
        Voltar
      </ButtonComponent>
      <ButtonComponent class="register__button" :disabled="!steps[currentStep].isValid" @click="currentStep++">
        Continuar
      </ButtonComponent>
    </div>
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

  &-buttons {
    display: flex;
    gap: $margin-3;
  }

  &__button {
    margin-top: $margin-3;
    flex: 1;
  }
}
</style>

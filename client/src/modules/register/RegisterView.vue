<script setup>
import PhysicalPerson from "@/modules/register/PhysicalPerson/PhysicalPerson.vue";
import SelectPersonType from "@/modules/register/SelectPersonType/SelectPersonType.vue";
import { PersonTypeEnum, StepsEnum } from "@/modules/register/types.js";
import ButtonComponent from "@/shared/components/Button/ButtonComponent.vue";
import HeadingComponent from "@/shared/components/Heading/HeadingComponent.vue";
import { headingOptionsEnum } from "@/shared/components/Heading/types.js";
import StepComponent from "@/shared/components/Step/StepComponent.vue";
import { computed, ref } from "vue";
import PasswordSelection from './Password/PasswordSelection.vue';

const totalSteps = ref(4);
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


const isSecondStepValid = computed(() => {
  const stepData = steps.value[StepsEnum.INSERT_DATA];
  if (isPhysicalPerson()) {
    return stepData.name && stepData.cpf && stepData.birthDate && stepData.telephone;
  }
  // Add validation for legal person if needed
  return false; // Placeholder for legal person validation
});

const isThirdStepValid = computed(() => {
  return steps.value[StepsEnum.PASSWORD].password.length >= 6;
});

const steps = ref({
  [StepsEnum.PERSON_TYPE]: {
    title: () => "Seja bem vindo(a)",
    email: "",
    selectedPersonType: 0, // Default to no selection
    isValid: isFirstStepValid,
    hasBackButton: false,
    nextButtonLabel: "Continuar"
  },
  [StepsEnum.INSERT_DATA]: {
    title: () => isPhysicalPerson() ? "Pessoa Física" : "Pessoa Jurídica",
    name: "",
    cpf: "",
    birthDate: "",
    telephone: "",
    isValid: isSecondStepValid,
    hasBackButton: true,
    backButtonLabel: "Voltar",
    nextButtonLabel: "Continuar"
  },
  [StepsEnum.PASSWORD]: {
    title: () => "Senha de acesso",
    password: "",
    isValid: isThirdStepValid,
    hasBackButton: true,
    backButtonLabel: "Voltar",
    nextButtonLabel: "Continuar"
  },
  [StepsEnum.CONFIRMATION]: {
    title: () => "Revise suas informações",
    isValid: isSecondStepValid,
    hasBackButton: true,
    backButtonLabel: "Voltar",
    nextButtonLabel: "Cadastrar"
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

function handleInputPhysicalPersonName(name) {
  steps.value[StepsEnum.INSERT_DATA].name = name;
};

function handleInputPhysicalPersonCpf(cpf) {
  steps.value[StepsEnum.INSERT_DATA].cpf = cpf;
};

function handleInputPhysicalPersonBirthdate(birthDate) {
  steps.value[StepsEnum.INSERT_DATA].birthDate = birthDate;
};

function handleInputPhysicalPersonTelephone(telephone) {
  steps.value[StepsEnum.INSERT_DATA].telephone = telephone;
};

function handleInputPassword(password) {
  steps.value[StepsEnum.PASSWORD].password = password;
};

</script>

<template>
  <section class="register">
    <StepComponent class="register__step" :current-step="currentStep" :total-steps="totalSteps" />
    <HeadingComponent class="register__heading" :level="headingOptionsEnum.MD">
      {{ steps[currentStep].title() }}
    </HeadingComponent>
    <SelectPersonType v-if="currentStep === 1" :selected-person="steps[StepsEnum.PERSON_TYPE].selectedPersonType" :email="steps[StepsEnum.PERSON_TYPE].email" @input-email="handleInputEmail" @selected-person-type="handleSelectedPersonType" />
    <PhysicalPerson 
      v-else-if="currentStep === 2 || currentStep === 4" 
      :name="steps[StepsEnum.INSERT_DATA].name" 
      :cpf="steps[StepsEnum.INSERT_DATA].cpf" 
      :birth-date="steps[StepsEnum.INSERT_DATA].birthDate" 
      :telephone="steps[StepsEnum.INSERT_DATA].telephone" 
      @input-name="handleInputPhysicalPersonName"
      @input-cpf="handleInputPhysicalPersonCpf"
      @input-birth-date="handleInputPhysicalPersonBirthdate"
      @input-telephone="handleInputPhysicalPersonTelephone"/>
    <PasswordSelection 
      v-else-if="currentStep === 3"
      :password="steps[StepsEnum.PASSWORD].password"
      @input-password="handleInputPassword" 
    />
    <div class="register-buttons">
      <ButtonComponent v-if="steps[currentStep].hasBackButton" class="register__button" style-type="secondary" :disabled="currentStep === 1" @click="goBack">
        {{ steps[currentStep].backButtonLabel }}
      </ButtonComponent>
      <ButtonComponent class="register__button" :disabled="!steps[currentStep].isValid" @click="currentStep++">
        {{ steps[currentStep].nextButtonLabel }}
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

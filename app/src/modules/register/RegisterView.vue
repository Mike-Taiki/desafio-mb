<script setup>
import PhysicalPerson from "@/modules/register/PhysicalPerson/PhysicalPerson.vue";
import SelectPersonType from "@/modules/register/SelectPersonType/SelectPersonType.vue";
import { LegalPersonStep, PersonTypeEnum, PersonTypeTranslationEnum, PhysicalPersonStep, StepsEnum } from "@/modules/register/types.js";
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
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  return emailRegex.test(email);
};

const isFirstStepValid = computed(() => {
  const isEmailValid = validateEmail(steps.value[currentStep.value].email);
  const isPersonTypeSelected = steps.value[currentStep.value].selectedPersonType !== 0;
  return isEmailValid && isPersonTypeSelected;
})

const isThirdStepValid = computed(() => {
  return steps.value[StepsEnum.PASSWORD].password.length >= 6;
});

const isFourthStepValid = computed(() => {
  const isPasswordValid = isThirdStepValid.value;
  return isPasswordValid && steps.value[StepsEnum.INSERT_DATA].isValid;
});

const steps = ref({
  [StepsEnum.PERSON_TYPE]: {
    title: () => "Seja bem vindo(a)",
    email: "",
    selectedPersonType: 0, // Default to no selection
    isValid: isFirstStepValid,
    hasBackButton: false,
    backButtonAction: handlePreviousStep,
    nextButtonLabel: "Continuar",
    nextButtonAction: handleNextStep
  },
  [StepsEnum.INSERT_DATA]: {},
  [StepsEnum.PASSWORD]: {
    title: () => "Senha de acesso",
    password: "",
    isValid: isThirdStepValid,
    hasBackButton: true,
    backButtonAction: handlePreviousStep,
    backButtonLabel: "Voltar",
    nextButtonLabel: "Continuar",
    nextButtonAction: handleNextStep
  },
  [StepsEnum.CONFIRMATION]: {
    title: () => "Revise suas informações",
    isValid: isFourthStepValid,
    hasBackButton: true,
    backButtonAction: handlePreviousStep,
    backButtonLabel: "Voltar",
    nextButtonLabel: "Cadastrar",
    nextButtonAction: handleFinalStep
  }
});

function isPhysicalPerson() {
  return steps.value[StepsEnum.PERSON_TYPE].selectedPersonType === PersonTypeEnum.PHYSICAL;
}

function handleSelectedPersonType(selectedPersonType) {
  steps.value[StepsEnum.PERSON_TYPE].selectedPersonType = selectedPersonType;
  steps.value[StepsEnum.INSERT_DATA] = isPhysicalPerson() ? PhysicalPersonStep(handlePreviousStep, handleNextStep) : LegalPersonStep(handlePreviousStep, handleNextStep)
};

function handleInputEmail(email) {
  steps.value[StepsEnum.PERSON_TYPE].email = email;
};

function handleInputName(name) {
  const field = isPhysicalPerson() ? 'name' : 'socialReason'
  steps.value[StepsEnum.INSERT_DATA][field] = name;
};

function handleInputDocument(document) {
  const field = isPhysicalPerson() ? 'Cpf' : 'Cnpj'
  steps.value[StepsEnum.INSERT_DATA][`masked${field}`] = document.maskedDocument
  steps.value[StepsEnum.INSERT_DATA][`unmasked${field}`] = document.unmaskedDocument
};

function handleInputDate(date) {
  const field = isPhysicalPerson() ? 'birthDate' : 'openingDate'
  steps.value[StepsEnum.INSERT_DATA][field] = date
};

function handleInputTelephone(telephone) {
  steps.value[StepsEnum.INSERT_DATA].maskedTelephone = telephone.maskedTelephone;
  steps.value[StepsEnum.INSERT_DATA].unmaskedTelephone = telephone.unmaskedTelephone;
};

function handleInputPassword(password) {
  steps.value[StepsEnum.PASSWORD].password = password;
};

function handlePreviousStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function handleNextStep() {
  currentStep.value++;
}

function handleFinalStep() {
  const formData = {
    email: steps.value[StepsEnum.PERSON_TYPE].email,
    personType: PersonTypeTranslationEnum[steps.value[StepsEnum.PERSON_TYPE].selectedPersonType],
    password: steps.value[StepsEnum.PASSWORD].password,
    telephone: steps.value[StepsEnum.INSERT_DATA].unmaskedTelephone,
  };

  if (isPhysicalPerson()) {
    formData.cpf = steps.value[StepsEnum.INSERT_DATA].unmaskedCpf;
    formData.birthDate = steps.value[StepsEnum.INSERT_DATA].birthDate;
  } else {
    formData.socialReason = steps.value[StepsEnum.INSERT_DATA].socialReason;
    formData.cnpj = steps.value[StepsEnum.INSERT_DATA].unmaskedCnpj;
    formData.openingDate = steps.value[StepsEnum.INSERT_DATA].openingDate;
  }

  fetch('/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        console.log("Registro realizado com sucesso!");
        // Aqui você pode adicionar uma mensagem de sucesso ou redirecionar o usuário
      } else {
        console.error("Falha no registro");
        // Aqui você pode mostrar uma mensagem de erro para o usuário
      }
    })
    .catch(error => {
      console.error("Erro durante o registro:", error);
      // Aqui você pode mostrar uma mensagem de erro para o usuário
    });
}

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
      :name="isPhysicalPerson() ? steps[StepsEnum.INSERT_DATA]['name'] : steps[StepsEnum.INSERT_DATA]['socialReason']" 
      :name-label="isPhysicalPerson() ? 'Nome' : 'Razão Social'"
      :document="isPhysicalPerson() ? steps[StepsEnum.INSERT_DATA]['unmaskedCpf'] : steps[StepsEnum.INSERT_DATA]['unmaskedCnpj']" 
      :document-label="isPhysicalPerson() ? 'CPF' : 'CNPJ'"
      :date="isPhysicalPerson() ? steps[StepsEnum.INSERT_DATA]['birthDate'] : steps[StepsEnum.INSERT_DATA]['openingDate']" 
      :date-label="isPhysicalPerson() ? 'Data de nascimento' : 'Data de abertura'"
      :telephone="steps[StepsEnum.INSERT_DATA]['unmaskedTelephone']"
      :password="steps[StepsEnum.PASSWORD]['password']"
      :has-input-password="currentStep === 4"
      @input-name="handleInputName"
      @input-document="handleInputDocument"
      @input-date="handleInputDate"
      @input-telephone="handleInputTelephone"
      @input-password="handleInputPassword"
      />
    <PasswordSelection 
      v-else-if="currentStep === 3"
      :password="steps[StepsEnum.PASSWORD].password"
      @input-password="handleInputPassword" 
    />
    <div class="register-buttons">
      <ButtonComponent v-if="steps[currentStep].hasBackButton" class="register__button" style-type="secondary" @click="steps[currentStep].backButtonAction">
        {{ steps[currentStep].backButtonLabel }}
      </ButtonComponent>
      <ButtonComponent class="register__button" :disabled="!steps[currentStep].isValid" @click="steps[currentStep].nextButtonAction">
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

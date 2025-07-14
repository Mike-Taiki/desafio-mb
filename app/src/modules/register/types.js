import { computed, reactive } from "vue";

export const StepsEnum = {
  PERSON_TYPE: 1,
  INSERT_DATA: 2,
  PASSWORD: 3,
  CONFIRMATION: 4,
};

export const PersonTypeEnum = {
  PHYSICAL: 1,
  LEGAL: 2,
};

export const PersonTypeTranslationEnum = {
  [PersonTypeEnum.PHYSICAL]: "PHYSICAL",
  [PersonTypeEnum.LEGAL]: "LEGAL",
};

export const LegalPersonStep = (handlePreviousStep, handleNextStep) => {
  const step = reactive({
    title: () => "Pessoa Jurídica",
    name: "",
    maskedCnpj: "",
    unmaskedCnpj: "",
    openingDate: "",
    maskedTelephone: "",
    unmaskedTelephone: "",
    hasBackButton: true,
    backButtonLabel: "Voltar",
    backButtonAction: handlePreviousStep,
    nextButtonLabel: "Continuar",
    nextButtonAction: handleNextStep,
  });

  step.isValid = computed(() => {
    return (
      step.name?.length > 0 &&
      step.unmaskedCnpj?.length >= 10 &&
      step.unmaskedCnpj?.length <= 11 &&
      step.openingDate?.length > 0 &&
      step.unmaskedTelephone?.length >= 10
    );
  });

  return step;
};

export const PhysicalPersonStep = (handlePreviousStep, handleNextStep) => {
  const step = reactive({
    title: () => "Pessoa Física",
    name: "",
    maskedCpf: "",
    unmaskedCpf: "",
    birthDate: "",
    maskedTelephone: "",
    unmaskedTelephone: "",
    hasBackButton: true,
    backButtonLabel: "Voltar",
    backButtonAction: handlePreviousStep,
    nextButtonLabel: "Continuar",
    nextButtonAction: handleNextStep,
  });

  step.isValid = computed(() => {
    return (
      step.name?.length > 0 &&
      step.unmaskedCpf?.length === 11 &&
      step.birthDate?.length > 0 &&
      step.unmaskedTelephone?.length >= 10
    );
  });

  return step;
};

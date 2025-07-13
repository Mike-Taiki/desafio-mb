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
  [PersonTypeEnum.PHYSICAL]: "Pessoa Física",
  [PersonTypeEnum.LEGAL]: "Pessoa Jurídica",
};

export const LegalPersonStep = (handlePreviousStep, handleNextStep) => ({
  title: () => "Pessoa Jurídica",
  name: "",
  maskedCnpj: "",
  unmaskedCnpj: "",
  openingDate: "",
  maskedTelephone: "",
  unmaskedTelephone: "",
  isValid: () => {
    return (
      this.name &&
      this.unmaskedCnpj &&
      this.openingDate &&
      this.unmaskedTelephone
    );
  },
  hasBackButton: true,
  backButtonLabel: "Voltar",
  backButtonAction: handlePreviousStep,
  nextButtonLabel: "Continuar",
  nextButtonAction: handleNextStep,
});

export const PhysicalPersonStep = (handlePreviousStep, handleNextStep) => ({
  title: () => "Pessoa Física",
  name: "",
  maskedCpf: "",
  unmaskedCpf: "",
  birthDate: "",
  maskedTelephone: "",
  unmaskedTelephone: "",
  isValid: () => {
    return (
      this.name && this.unmaskedCpf && this.birthDate && this.unmaskedTelephone
    );
  },
  hasBackButton: true,
  backButtonLabel: "Voltar",
  backButtonAction: handlePreviousStep,
  nextButtonLabel: "Continuar",
  nextButtonAction: handleNextStep,
});

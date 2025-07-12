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

export const LegalPersonStep = {
  title: () => "Pessoa Jurídica",
  name: "",
  cnpj: "",
  openingDate: "",
  telephone: "",
  isValid: () => {
    return this.name && this.cnpj && this.openingDate && this.telephone;
  },
  hasBackButton: true,
  backButtonLabel: "Voltar",
  nextButtonLabel: "Continuar"
}

export const PhysicalPersonStep = {
  title: () => "Pessoa Física",
  name: "",
  cpf: "",
  birthDate: "",
  telephone: "",
  isValid: () => {
    return this.name && this.cpf && this.birthDate && this.telephone;
  },
  hasBackButton: true,
  backButtonLabel: "Voltar",
  nextButtonLabel: "Continuar"
}
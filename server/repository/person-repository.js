const {
	PhysicalPerson,
} = require("../domain/registration/physical-person/physical-person");
const {
	LegalPerson,
} = require("../domain/registration/legal-person/legal-person");

class PersonRepository {
	static createPerson(requestBody) {
		const {
			personType,
			email,
			telephone,
			password,
			name,
			cpf,
			cnpj,
			birthDate,
			openingDate,
		} = requestBody;

		if (personType === "PHYSICAL") {
			return new PhysicalPerson(
				email,
				telephone,
				password,
				name,
				cpf,
				birthDate
			);
		} else if (personType === "LEGAL") {
			return new LegalPerson(
				email,
				telephone,
				password,
				name,
				cnpj,
				openingDate
			);
		}
	}
}

module.exports = {
	PersonRepository,
};

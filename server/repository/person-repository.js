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
			socialReason,
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
				socialReason,
				cnpj,
				openingDate
			);
		} else {
			throw new Error("Invalid person type");
		}
	}
}

module.exports = {
	PersonRepository,
};

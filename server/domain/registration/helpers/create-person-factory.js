const { PhysicalPerson } = require("../physical-person/physical-person");
const { LegalPerson } = require("../legal-person/legal-person");

function createPersonFactory(requestBody) {
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
		return new PhysicalPerson(email, telephone, password, name, cpf, birthDate);
	} else if (personType === "LEGAL") {
		return new LegalPerson(email, telephone, password, name, cnpj, openingDate);
	}
}

module.exports = {
	createPersonFactory,
};

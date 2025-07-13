const { Person } = require("../types/person.js");

class LegalPerson extends Person {
	constructor(email, telephone, password, name, cnpj, openingDate) {
		super(email, telephone, password);
		this.name = this.validateName(name);
		this.cnpj = this.validateCnpj(cnpj);
		this.openingDate = this.validateOpeningDate(openingDate);
	}

	validateName(name) {
		if (!name) {
			throw new Error("Name is required");
		}

		if (typeof name !== "string") {
			throw new Error("Name must be a string");
		}

		if (name.length < 3 || name.length > 255) {
			throw new Error("Name must be between 3 and 255 characters");
		}

		return name;
	}

	validateCnpj(cnpj) {
		if (!cnpj) {
			throw new Error("CNPJ is required");
		}

		if (cnpj.length !== 14) {
			throw new Error("CNPJ must be 14 characters");
		}

		if (!cnpj.match(/^\d{14}$/)) {
			throw new Error("CNPJ must be only numbers");
		}

		return cnpj;
	}

	validateOpeningDate(openingDate) {
		if (!openingDate) {
			throw new Error("Opening date is required");
		}

		if (typeof openingDate !== "string") {
			throw new Error("Opening date must be a string");
		}

		return openingDate;
	}
}

module.exports = { LegalPerson };

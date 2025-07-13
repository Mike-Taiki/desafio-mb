const { Person } = require("../types/person.js");

class PhysicalPerson extends Person {
	constructor(email, telephone, password, name, cpf, birthDate) {
		super(email, telephone, password);
		this.name = this.validateName(name);
		this.cpf = this.validateCpf(cpf);
		this.birthDate = this.validateBirthDate(birthDate);
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

	validateCpf(cpf) {
		if (!cpf) {
			throw new Error("CPF is required");
		}

		if (typeof cpf !== "string") {
			throw new Error("CPF must be a string");
		}

		if (cpf.length !== 11) {
			throw new Error("CPF must be 11 characters");
		}

		if (!cpf.match(/^\d{11}$/)) {
			throw new Error("CPF must be only numbers");
		}

		return cpf;
	}

	validateBirthDate(birthDate) {
		if (!birthDate) {
			throw new Error("Birth date is required");
		}

		if (typeof birthDate !== "string") {
			throw new Error("Birth date must be a string");
		}

		if (birthDate.length !== 10) {
			throw new Error("Birth date must be 10 characters");
		}

		return birthDate;
	}
}

module.exports = {
	PhysicalPerson,
};

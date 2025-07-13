const { Person } = require("../types/person.js");

class LegalPerson extends Person {
	constructor(email, telephone, password, socialReason, cnpj, openingDate) {
		super(email, telephone, password);
		this.socialReason = this.validateSocialReason(socialReason);
		this.cnpj = this.validateCnpj(cnpj);
		this.openingDate = this.validateOpeningDate(openingDate);
	}

	validateSocialReason(socialReason) {
		if (!socialReason) {
			throw new Error("Social reason is required");
		}

		if (typeof socialReason !== "string") {
			throw new Error("Social reason must be a string");
		}

		if (socialReason.length < 10 || socialReason.length > 255) {
			throw new Error("Social reason must be between 10 and 255 characters");
		}

		return socialReason;
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

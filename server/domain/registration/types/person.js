class Person {
	constructor(email, telephone, password) {
		if (this.constructor === Person) {
			throw new Error("Person is an abstract class and cannot be instantiated");
		}
		this.email = this.validateEmail(email);
		this.telephone = this.validateTelephone(telephone);
		this.password = this.validatePassword(password);
	}

	validateEmail(email) {
		if (!email) {
			throw new Error("Email is required");
		}

		if (typeof email !== "string") {
			throw new Error("Email must be a string");
		}

		const isValidEmail = new RegExp(
			/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
		).test(email);
		if (!isValidEmail) {
			throw new Error("Email must be a valid email address");
		}

		return email;
	}

	validateTelephone(telephone) {
		if (!telephone) {
			throw new Error("Telephone is required");
		}

		if (typeof telephone !== "string") {
			throw new Error("Telephone must be a string");
		}

		if (telephone.length < 10 || telephone.length > 11) {
			throw new Error("Telephone must be a valid phone number");
		}

		return telephone;
	}

	validatePassword(password) {
		if (!password) {
			throw new Error("Password is required");
		}

		if (typeof password !== "string") {
			throw new Error("Password must be a string");
		}

		if (password.length !== 6) {
			throw new Error("Password must be 6 characters");
		}

		return password;
	}
}

module.exports = {
	Person,
};

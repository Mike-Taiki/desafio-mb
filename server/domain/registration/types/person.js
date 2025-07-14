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

		const isValidEmail = new RegExp(/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/).test(
			email
		);
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

		const isValidTelephone = new RegExp(/^\d{10,11}$/).test(telephone);
		if (!isValidTelephone) {
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

	validateDate(field, date) {
		if (!date) {
			throw new Error(`${field} is required`);
		}

		if (typeof date !== "string") {
			throw new Error(`${field} must be a string`);
		}

		if (date.length !== 10) {
			throw new Error(`${field} must be 10 characters`);
		}

		const isValidDate = new RegExp(/^\d{4}-\d{2}-\d{2}$/).test(date);

		if (!isValidDate) {
			throw new Error(`${field} must be a valid date in the format YYYY-MM-DD`);
		}

		const [year, month, day] = date.split("-");

		const dateToValidate = new Date(
			parseInt(year),
			parseInt(month) - 1,
			parseInt(day)
		);

		const currentDate = new Date();
		const currentDateOnly = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate()
		);

		if (dateToValidate >= currentDateOnly) {
			throw new Error(`${field} must be a date before the current date`);
		}

		return date;
	}
}

module.exports = {
	Person,
};

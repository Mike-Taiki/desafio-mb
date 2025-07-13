const express = require("express");
const path = require("path");

const router = express.Router();

const {
	PhysicalPerson,
} = require("../domain/registration/validations/physical-person");

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../app/dist/index.html"));
});

router.post("/", (req, res) => {
	console.log("chegou aqui");
	const {
		email,
		personType,
		password,
		name,
		telephone,
		cpf,
		cnpj,
		birthDate,
		openingDate,
	} = req.body;

	// if (!email || !personType || !password || !name || !telephone) {
	// 	return res.status(400).json({
	// 		error: "Dados obrigatórios faltando",
	// 	});
	// }

	// console.log("Dados do registro:", {
	// 	email,
	// 	personType,
	// 	name,
	// 	telephone,
	// 	...(personType === "PHYSICAL" ? { cpf, birthDate } : { cnpj, openingDate }),
	// })

	try {
		const person = new PhysicalPerson(
			email,
			telephone,
			password,
			name,
			cpf,
			birthDate
		);

		console.log("person: ", person);
		res.status(201).json({
			message: "Registro realizado com sucesso",
			data: person,
		});
	} catch (error) {
		return res.status(400).json({
			error: error.message,
		});
	}
});

module.exports = router;

const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../app/dist/index.html"));
});

router.post("/registration", (req, res) => {
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

	if (!email || !personType || !password || !name || !telephone) {
		return res.status(400).json({
			error: "Dados obrigatórios faltando",
		});
	}

	console.log("Dados do registro:", {
		email,
		personType,
		name,
		telephone,
		...(personType === "PHYSICAL" ? { cpf, birthDate } : { cnpj, openingDate }),
	});

	res.status(201).json({
		message: "Registro realizado com sucesso",
		data: {
			email,
			personType,
			name,
		},
	});
});

module.exports = router;

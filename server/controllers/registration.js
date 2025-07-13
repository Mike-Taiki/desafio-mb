const express = require("express");
const path = require("path");

const router = express.Router();

const { PersonRepository } = require("../repository/person-repository");

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../app/dist/index.html"));
});

router.post("/", (req, res) => {
	try {
		const person = PersonRepository.createPerson(req.body);
		res.status(201).json({
			message: "User created successfully",
			data: person,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
});

module.exports = router;

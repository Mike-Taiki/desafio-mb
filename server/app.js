const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const registration = require("./controllers/registration");

app.use(express.json());

app.use(express.static(path.join(__dirname, "../app/dist")));

app.use("/registration", registration);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

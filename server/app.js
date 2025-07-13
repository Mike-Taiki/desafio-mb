const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const registration = require("./controllers/registration");

app.use(express.json());

const options = {
	dotfiles: "ignore",
	etag: false,
	extensions: ["htm", "html"],
	index: false,
	maxAge: "1d",
	redirect: false,
	setHeaders(res, path, stat) {
		res.set("x-timestamp", Date.now());
	},
};

app.use(express.static("/dist", options));

app.use("/registration", registration);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

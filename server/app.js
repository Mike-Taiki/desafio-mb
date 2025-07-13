const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/dist/index.html"));
});

app.post("/registration", (req, res) => {
  const {
    email,
    personType,
    password,
    name,
    telephone,
    cpf,
    cnpj,
    birthDate,
    openingDate
  } = req.body;

  if (!email || !personType || !password || !name || !telephone) {
    return res.status(400).json({
      error: "Dados obrigatórios faltando"
    });
  }

  console.log("Dados do registro:", {
    email,
    personType,
    name,
    telephone,
    ...(personType === "PHYSICAL" ? { cpf, birthDate } : { cnpj, openingDate })
  });

  res.status(201).json({
    message: "Registro realizado com sucesso",
    data: {
      email,
      personType,
      name
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const app = express();
const port = 3000;

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

app.use(express.static("static", options));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

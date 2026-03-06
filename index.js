const express = require("express");
const bodyParser = require("body-parser");

const general = require("./router/general.js");
const auth_users = require("./router/auth_users.js");

const app = express();

app.use(bodyParser.json());

app.use("/", general.general);

app.use("/customer", auth_users.authenticated);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//* require block
require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");
const logger = require("morgan");

//* router requires
const usersRouter = require("./routes/usersRouter")


const app = express();

//* middleware block
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

//* Middleware to verify token and assign user object of payload to req.user.
app.use(require('./config/checkToken'));
app.use("/api/users", usersRouter);

//* listen block
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});

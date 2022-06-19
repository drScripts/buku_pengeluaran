const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const usersRouter = require("./routes/users");
const businessRouter = require("./routes/busines");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const prefix = "/v1/api";

app.use(`${prefix}/users`, usersRouter);
app.use(`${prefix}/busines`, businessRouter);

module.exports = app;

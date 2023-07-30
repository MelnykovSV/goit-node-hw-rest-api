import { IError } from "./interfaces";
import * as Express from "express";
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_: Express.Request, res: Express.Response) => {
  res.status(400).json({
    status: "error",
    code: 400,
    message: "Bad request",
    data: "Not found",
  });
});

app.use(
  (
    err: IError,
    _: Express.Request,
    res: Express.Response,
    __: Express.NextFunction
  ) => {
    const { status = 500, message = "Internal Server Error" } = err;
    res.status(status).json({
      status: "error",
      code: status,
      message: message,
    });
  }
);

module.exports = app;

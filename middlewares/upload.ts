// import * as express from "express";
import { IFileNameCallback } from "../interfaces";
const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: async (
    req: Express.Request,
    file: Express.Multer.File,
    cb: IFileNameCallback
  ) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;

export {};

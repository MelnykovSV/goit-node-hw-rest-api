import * as express from "express";
const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

function isValidId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
}

module.exports = isValidId;

export {};

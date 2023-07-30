import * as express from "express";
import { IError } from "../interfaces";
function handleMongooseError(
  error: IError,
  _data: any,
  next: express.NextFunction
) {
  error.status = 400;
  next();
}

module.exports = handleMongooseError;

// TODO: CHECK THIS 'DATA'!

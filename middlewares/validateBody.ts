import * as express from "express";
import { ObjectSchema } from "@hapi/joi";

const { HttpError } = require("../helpers");

const validateBody = (schema: ObjectSchema) => {
  const func = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!Object.keys(req.body).length || !req.body) {
      next(HttpError(400, "missing fields"));
    }
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;

export {};

import { IError } from "../interfaces";

const defaultErrorMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (
  status: keyof typeof defaultErrorMessages,
  message = defaultErrorMessages[status]
) => {
  if (!defaultErrorMessages.hasOwnProperty(status)) {
    const error = new Error("Unknown error");
    return error;
  }

  const error = new Error(message) as IError;
  error.status = status;
  return error;
};

module.exports = HttpError;

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../config";
import { TGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import handleCastError from "../../errors/handleCastError";
import ApiError from "../../errors/ApiError";

// global error handler function
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === "development"
    ? console.log("globalErrorHandler", error)
    : console.log("globalErrorHanler", error);

  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages: TGenericErrorMessage[] = [];

  if (error?.name === "ValidationError") {
    // catch validation error functionality
    const simplifiedError = handleValidationError(error);
    // set errors into variabls
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    // catch ZOD error functionality
    const simplifiedError = handleZodError(error);
    // set errors into variabls
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === "CastError") {
    // catch cast errors
    const simplifiedError = handleCastError(error);

    // set errors into variabls
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    // set errors into variabls for api error.
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    // catch our throwable custom error and set into variables.
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  // send response to the frontend .
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;

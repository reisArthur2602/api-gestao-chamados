import { NextFunction, Response, Request } from "express";

import { ZodError } from "zod";
import { AplicationError } from "../helpers/error";
import { StatusCodes } from "http-status-codes";

export const ErrorMiddleware = (
  error: Error & Partial<AplicationError>,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError)
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "FILL_DATA_INCORRECT" });

  const statusCode = error.statusCode ?? 500;
  const message = error.message ?? "INTERNAL_SERVER_ERROR";
  console.error({ status: error.statusCode, message });
  return response.status(statusCode).json({ message });
};

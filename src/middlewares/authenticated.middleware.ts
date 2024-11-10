import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/error";

interface Payload {
  sub: string;
}

export const AuthenticatedMiddleware: RequestHandler = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) throw new UnauthorizedError("USER_UNAUTHORIZED");

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;
    req.userId = sub;
    return next();
  } catch {
    throw new UnauthorizedError("USER_UNAUTHORIZED");
  }
};

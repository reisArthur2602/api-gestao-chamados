import { Router } from "express";

import { StatusCodes } from "http-status-codes";
import UserController from "./user.controller";
import { RegisterUserSchema, SessionUserSchema } from "./user.schema";
import { AuthenticatedMiddleware } from "../../middlewares/authenticated.middleware";

export const UserRoutes = Router();
const userController = new UserController();

UserRoutes.post("/register", async (request, response) => {
  const body = RegisterUserSchema.parse(request.body);

  await userController.create(body);

  return response.status(StatusCodes.NO_CONTENT).json();
});

UserRoutes.post("/session", async (request, response) => {
  const body = SessionUserSchema.parse(request.body);

  const user = await userController.session(body);

  return response.status(StatusCodes.OK).json(user);
});

UserRoutes.get("/me", AuthenticatedMiddleware, async (request, response) => {
  const user = await userController.details(request.userId);
  return response.status(StatusCodes.OK).json(user);
});

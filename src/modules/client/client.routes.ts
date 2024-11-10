import { StatusCodes } from "http-status-codes";
import {
  DeleteClientSchema,
  EditClientSchema,
  RegisterClientSchema,
} from "./client.schema";
import ClientController from "./client.controller";
import { Router } from "express";

export const ClientRoutes = Router();

const clientController = new ClientController();

ClientRoutes.post("/", async (request, response) => {
  const body = RegisterClientSchema.parse(request.body);

  await clientController.create({
    ...body,
    userId: request.userId,
  });

  return response.status(StatusCodes.NO_CONTENT).json();
});

ClientRoutes.get("/", async (request, response) => {
  const clients = await clientController.list();

  return response.status(StatusCodes.OK).json(clients);
});

ClientRoutes.delete("/", async (request, response) => {
  const query = DeleteClientSchema.parse(request.query);

  await clientController.delete(query.id);

  return response.status(StatusCodes.NO_CONTENT).json();
});

ClientRoutes.put("/", async (request, response) => {
  const body = EditClientSchema.parse(request.body);

  await clientController.update(body);

  return response.status(StatusCodes.NO_CONTENT).json();
});

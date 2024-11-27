import { Router } from "express";

import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import OrderController from "./order.controller";
import { CreateOrderSchema, FinishOrderSchema, RemoveOrderSchema } from "./order.schema";
import { EditClientSchema } from "../client/client.schema";

export const OrderRoutes = Router();
const orderController = new OrderController();

OrderRoutes.post("/", async (request, response) => {
  const body = CreateOrderSchema.parse(request.body);

  await orderController.create({
    ...body,
    userId: request.userId,
  });

  return response.status(StatusCodes.NO_CONTENT).json();
});

OrderRoutes.get("/", async (request, response) => {
  const orders = await orderController.list();
  return response.status(StatusCodes.OK).json(orders);
});

OrderRoutes.delete("/", async (request, response) => {
  const query = RemoveOrderSchema.parse(request.query);
  await orderController.delete(query.id);
  return response.status(StatusCodes.NO_CONTENT).json();
});

OrderRoutes.patch("/finish", async (request, response) => {
  const query = FinishOrderSchema.parse(request.query);
  await orderController.finish(query.id);
  return response.status(StatusCodes.NO_CONTENT).json();
});

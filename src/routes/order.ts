import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import OrderController from "../controllers/order/OrderController";

export const OrderRoutes = Router();
const orderController = new OrderController();

OrderRoutes.post("/", isAuthenticated, async (request, response) => {
  const body = z
    .object({
      category_id: z.string().min(1),
      clientId: z.string().min(1),
      description: z.string().min(1),
    })
    .parse(request.body);

  const order = await orderController.create({
    ...body,
    userId: request.userId,
  });

  return response.status(StatusCodes.CREATED).json(order);
});

OrderRoutes.get("/", isAuthenticated, async (request, response) => {
  const orders = await orderController.list();
  return response.status(StatusCodes.OK).json(orders);
});

OrderRoutes.delete("/:id", isAuthenticated, async (request, response) => {
  const params = z.object({ id: z.string() }).parse(request.params);

  const order = await orderController.delete(params.id);
  return response.status(StatusCodes.OK).json(order);
});

OrderRoutes.patch("/finish", isAuthenticated, async (request, response) => {
  const query = z.object({ id: z.string().min(1) }).parse(request.query);

  const order = await orderController.finish(query.id);
  return response.status(StatusCodes.OK).json(order);
});

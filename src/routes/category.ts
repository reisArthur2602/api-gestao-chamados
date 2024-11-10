import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import CategoryController from "../controllers/category/CategoryController";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export const CategoryRoutes = Router();
const categoryController = new CategoryController();

CategoryRoutes.post("/", isAuthenticated, async (request, response) => {
  const body = z
    .object({ name: z.string().min(1).trim().toLowerCase() })
    .parse(request.body);

  const category = await categoryController.create(body);

  return response.status(StatusCodes.CREATED).json(category);
});

CategoryRoutes.get("/", isAuthenticated, async (request, response) => {
  const categories = await categoryController.list();

  return response.status(StatusCodes.OK).json(categories);
});

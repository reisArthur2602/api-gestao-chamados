import { Router } from "express";

import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { CreateCategorySchema, RemoveCategorySchema } from "./category.schema";
import CategoryController from "./category.controller";

export const CategoryRoutes = Router();
const categoryController = new CategoryController();

CategoryRoutes.post("/", async (request, response) => {
  const body = CreateCategorySchema.parse(request.body);

  await categoryController.create(body);

  return response.status(StatusCodes.NO_CONTENT).json();
});

CategoryRoutes.get("/", async (request, response) => {
  const categories = await categoryController.list();

  return response.status(StatusCodes.OK).json(categories);
});

CategoryRoutes.delete("/", async (request, response) => {
  const query = RemoveCategorySchema.parse(request.query);

  await categoryController.remove(query.id);

  return response.status(StatusCodes.NO_CONTENT).json();
});

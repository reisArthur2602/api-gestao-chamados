import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import CategoryController from "../controllers/category/CategoryController";

export const CategoryRoutes = Router();
const categoryController = new CategoryController();

CategoryRoutes.get("/", isAuthenticated, async (request, response) => {
  console.log("");
});

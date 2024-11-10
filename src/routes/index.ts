import { Router } from "express";
import { OrderRoutes } from "./order";

import { ClientRoutes } from "./client";

import { UserRoutes } from "../modules/user/user.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const routes = Router();
routes.use("/order", OrderRoutes);
routes.use("/user", UserRoutes);
routes.use("/client", ClientRoutes);
routes.use("/category", isAuthenticated, CategoryRoutes);

export default routes;

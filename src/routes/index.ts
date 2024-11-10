import { Router } from "express";
import { OrderRoutes } from "./order";

import { UserRoutes } from "../modules/user/user.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { ClientRoutes } from "../modules/client/client.routes";

const routes = Router();
routes.use("/order", OrderRoutes);
routes.use("/user", UserRoutes);
routes.use("/client", isAuthenticated, ClientRoutes);
routes.use("/category", isAuthenticated, CategoryRoutes);

export default routes;

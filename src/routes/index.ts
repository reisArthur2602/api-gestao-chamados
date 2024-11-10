import { Router } from "express";

import { UserRoutes } from "../modules/user/user.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { ClientRoutes } from "../modules/client/client.routes";
import { OrderRoutes } from "../modules/order/order.routes";

const routes = Router();
routes.use("/user", UserRoutes);
routes.use("/category", isAuthenticated, CategoryRoutes);
routes.use("/client", isAuthenticated, ClientRoutes);
routes.use("/order", isAuthenticated, OrderRoutes);

export default routes;

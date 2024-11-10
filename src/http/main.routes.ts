import { Router } from "express";

import { UserRoutes } from "../modules/user/user.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { AuthenticatedMiddleware } from "../middlewares/authenticated.middleware";
import { ClientRoutes } from "../modules/client/client.routes";
import { OrderRoutes } from "../modules/order/order.routes";

const MainRoutes = Router();

MainRoutes.use("/user", UserRoutes);
MainRoutes.use("/category", AuthenticatedMiddleware, CategoryRoutes);
MainRoutes.use("/client", AuthenticatedMiddleware, ClientRoutes);
MainRoutes.use("/order", AuthenticatedMiddleware, OrderRoutes);

export default MainRoutes;

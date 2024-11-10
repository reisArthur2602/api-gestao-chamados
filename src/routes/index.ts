import { Router } from "express";
import { OrderRoutes } from "./order";

import { ClientRoutes } from "./client";
import { CategoryRoutes } from "./category";
import { UserRoutes } from "../modules/user/user.routes";

const routes = Router();
routes.use("/order", OrderRoutes);
routes.use("/user", UserRoutes);
routes.use("/client", ClientRoutes);
routes.use("/category", CategoryRoutes);

export default routes;

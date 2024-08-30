import { Router } from 'express';
import { OrderRoutes } from './order';
import { UserRoutes } from './user';
import { ClientRoutes } from './client';

const routes = Router();
routes.use('/order', OrderRoutes);
routes.use('/user', UserRoutes);
routes.use('/client', ClientRoutes);

export default routes;

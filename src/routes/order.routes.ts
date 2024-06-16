import { Router } from 'express';
import * as order from '../controllers/order';
import { isAuthenticated } from '../middlewares/isAuthenticated';

export const OrderRoutes = Router();

OrderRoutes.post('/order', isAuthenticated, order.Create);
OrderRoutes.get('/order', isAuthenticated, order.GetAll);
OrderRoutes.put('/order', isAuthenticated, order.Update);
OrderRoutes.delete('/order/:id', isAuthenticated, order.Delete);

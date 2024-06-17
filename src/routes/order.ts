import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import {
  CreateOrderController,
  DeleteOrderController,
  GetAllOrderController,
  UpdateOrderController,
} from '../controllers/order';

export const OrderRoutes = Router();

OrderRoutes.post('/order', isAuthenticated, async (req, res) => {
  const { body, statusCode } = await CreateOrderController({
    body: { ...req.body, userId: req.userId },
  });
  return res.status(statusCode).json(body);
});

OrderRoutes.get('/order', isAuthenticated, async (req, res) => {
  const { body, statusCode } = await GetAllOrderController({
    userId: req.userId,
  });
  return res.status(statusCode).json(body);
});

OrderRoutes.patch('/order/:id', isAuthenticated, async (req, res) => {
  const { body, statusCode } = await UpdateOrderController({
    body: req.body,
    params: req.params.id,
  });
  return res.status(statusCode).json(body);
});

OrderRoutes.delete('/order/:id', isAuthenticated, async (req, res) => {
  const { body, statusCode } = await DeleteOrderController({
    params: req.params.id,
  });
  return res.status(statusCode).json(body);
});

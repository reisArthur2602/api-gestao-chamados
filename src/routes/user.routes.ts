import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import {
  AuthUserController,
  CreateUserController,
  DetailsUserController,
} from '../controllers/user';

export const UserRoutes = Router();

UserRoutes.post('/register', async (req, res) => {
  const { body, statusCode } = await CreateUserController(req);
  return res.status(statusCode).json(body);
});

UserRoutes.post('/login', async (req, res) => {
  const { body, statusCode } = await AuthUserController(req);
  return res.status(statusCode).json(body);
});

UserRoutes.get('/me', isAuthenticated, async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const { body, statusCode } = await DetailsUserController(userId);
  return res.status(statusCode).json(body);
});

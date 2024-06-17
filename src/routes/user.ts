import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import {
  AuthUserController,
  CreateUserController,
  DetailsUserController,
} from '../controllers/user';

export const UserRoutes = Router();

UserRoutes.post('/register', async (req, res) => {
  const { body, statusCode } = await CreateUserController({ body: req.body });
  return res.status(statusCode).json(body);
});

UserRoutes.post('/login', async (req, res) => {
  const { body, statusCode } = await AuthUserController({ body: req.body });
  return res.status(statusCode).json(body);
});

UserRoutes.get('/me', isAuthenticated, async (req, res) => {
  const { body, statusCode } = await DetailsUserController({
    userId: req.userId,
  });
  return res.status(statusCode).json(body);
});

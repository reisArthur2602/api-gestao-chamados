import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import {
  CreateClientController,
  DeleteClientController,
  GetAllClientController,
  UpdateClientController,
} from '../controllers/client';

export const ClientRoutes = Router();

ClientRoutes.post('/client', isAuthenticated, async (req, res) => {
  const { statusCode, body } = await CreateClientController({
    body: { ...req.body, userId: req.userId },
  });
  return res.status(statusCode).json(body);
});

ClientRoutes.get('/client', isAuthenticated, async (req, res) => {
  const { statusCode, body } = await GetAllClientController({
    userId: req.userId,
  });

  return res.status(statusCode).json(body);
});

ClientRoutes.delete('/client/:id', isAuthenticated, async (req, res) => {
  const { statusCode, body } = await DeleteClientController({
    params: req.params.id,
  });
  return res.status(statusCode).json(body);
});

ClientRoutes.patch('/client/:id', isAuthenticated, async (req, res) => {
  const { statusCode, body } = await UpdateClientController({
    params: req.params.id,
    body: req.body,
  });
  return res.status(statusCode).json(body);
});

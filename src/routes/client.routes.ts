import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import * as client from '../controllers/order';
export const ClientRoutes = Router();

ClientRoutes.post('/client', isAuthenticated, client.Create);
ClientRoutes.get('/client', isAuthenticated, client.GetAll);
ClientRoutes.put('/client', isAuthenticated, client.Update);
ClientRoutes.delete('/client/:id', isAuthenticated, client.Delete);

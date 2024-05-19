import { Router } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';
import * as user from './controllers/user';
import * as client from './controllers/client';
import * as order from './controllers/order';
export const router = Router();

// user
router.post('/register', user.Create);
router.post('/login', user.Auth);
router.get('/me', isAuthenticated, user.Details);

// clients
router.post('/clients', isAuthenticated, client.Create);
router.get('/clients', isAuthenticated, client.GetAll);

// order
router.post('/order', isAuthenticated, order.Create);

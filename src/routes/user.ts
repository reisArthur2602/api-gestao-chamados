import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { z } from 'zod';
import UserController from '../controllers/user/UserController';
import { StatusCodes } from 'http-status-codes';

export const UserRoutes = Router();
const userController = new UserController();

UserRoutes.post('/register', async (request, response) => {
    const body = z
        .object({
            username: z.string().min(1),
            email: z.string().min(1).email().trim(),
            password: z.string().min(6),
        })
        .parse(request.body);

    const user = await userController.create(body);
    return response.status(StatusCodes.CREATED).json(user);
});

UserRoutes.post('/session', async (request, response) => {
    const body = z
        .object({
            email: z.string().min(1).email().trim(),
            password: z.string().min(6),
        })
        .parse(request.body);

    const user = await userController.session(body);

    return response.status(StatusCodes.OK).json(user);
});

UserRoutes.get('/me', isAuthenticated, async (request, response) => {
    const user = await userController.details({ id: request.userId });
    return response.status(StatusCodes.OK).json(user);
});

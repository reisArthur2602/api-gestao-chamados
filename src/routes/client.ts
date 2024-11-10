import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';

import { z } from 'zod';
import ClientController from '../controllers/client/ClientController';
import { StatusCodes } from 'http-status-codes';

export const ClientRoutes = Router();

const clientController = new ClientController();

ClientRoutes.post('/', isAuthenticated, async (request, response) => {
    const body = z
        .object({
            name: z.string().min(1).trim().toLowerCase(),
            email: z.string().min(1).email().trim(),
            address: z.string().min(1).toLowerCase(),
            phone: z.string().length(11).trim(),
            cpf: z.string().length(11).trim(),
        })
        .parse(request.body);

    const client = await clientController.create({
        ...body,
        userId: request.userId,
    });

    return response.status(StatusCodes.CREATED).json(client);
});

ClientRoutes.get('/', isAuthenticated, async (request, response) => {
    const clients = await clientController.list({ userId: request.userId });

    return response.status(StatusCodes.OK).json(clients);
});

ClientRoutes.delete(
    '/:id',
    isAuthenticated,
    async (request, response) => {
        const params = z
            .object({ id: z.string().min(1) })
            .parse(request.params);

        const client = await clientController.delete(params);
        return response.status(StatusCodes.OK).json(client);
    }
);

ClientRoutes.patch('/', isAuthenticated, async (request, response) => {
    const body = z
        .object({
            id: z.string().min(1),
            address: z.string().min(1),
            phone: z.string().min(11),
        })
        .parse(request.body);

    const client = await clientController.update(body);
    return response.status(StatusCodes.OK).json(client);
});

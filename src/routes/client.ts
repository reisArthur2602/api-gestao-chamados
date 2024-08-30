import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import {
    DeleteClientController,
    UpdateClientController,
} from '../controllers/client';
import { z } from 'zod';
import { BadRequestError } from '../helpers/error';
import ClientController from '../controllers/client/ClientController';
import { StatusCodes } from 'http-status-codes';

export const ClientRoutes = Router();
const clientController = new ClientController();

ClientRoutes.post('/client', isAuthenticated, async (request, response) => {
    const body = z
        .object({
            name: z.string().min(1).trim().toLowerCase(),
            email: z.string().min(1).email().trim(),
            address: z.string().min(1).toLowerCase(),
            telefone: z.string().length(11).trim(),
            cpf: z.string().length(11).trim(),
        })
        .parse(request.body);

    if (!body) throw new BadRequestError('Preencha os dados corretamente');

    const client = await clientController.create({
        ...body,
        userId: request.userId,
    });

    return response.status(StatusCodes.CREATED).json(client);
});

ClientRoutes.get('/client', isAuthenticated, async (request, response) => {
    const clients = await clientController.list({ userId: request.userId });

    return response.status(StatusCodes.OK).json(clients);
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

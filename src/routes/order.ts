import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import OrderController from '../controllers/order/OrderController';

export const OrderRoutes = Router();
const orderController = new OrderController();

OrderRoutes.post('/', isAuthenticated, async (request, response) => {
    const body = z
        .object({
            clientId: z.string().min(1),
            description: z.string().min(1),
            status: z.string(),
            subject: z.string(),
        })
        .parse(request.body);
    const order = await orderController.create({
        ...body,
        userId: request.userId,
    });
    return response.status(StatusCodes.CREATED).json(order);
});

OrderRoutes.get('/', isAuthenticated, async (request, response) => {
    const orders = await orderController.list({
        userId: request.userId,
    });
    return response.status(StatusCodes.OK).json(orders);
});

OrderRoutes.delete('/:id', isAuthenticated, async (request, response) => {
    const params = z.object({ id: z.string() }).parse(request.params);

    const order = await orderController.delete(params);
    return response.status(StatusCodes.OK).json(order);
});

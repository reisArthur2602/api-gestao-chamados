import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { UpdateOrderController } from '../controllers/order';
import { FilterOrderController } from '../controllers/order/filter';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import OrderController from '../controllers/order/OrderController';

export const OrderRoutes = Router();
const orderController = new OrderController();

OrderRoutes.post('/order', isAuthenticated, async (request, response) => {
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

OrderRoutes.get('/order', isAuthenticated, async (request, response) => {
    const orders = await orderController.list({
        userId: request.userId,
    });
    return response.status(StatusCodes.OK).json(orders);
});

OrderRoutes.get('/order/filter', isAuthenticated, async (req, res) => {
    const { body, statusCode } = await FilterOrderController({
        query: req.query,
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

OrderRoutes.delete('/order/:id', isAuthenticated, async (request, response) => {
    const params = z.object({ id: z.string() }).parse(request.params);

    const order = await orderController.delete(params);
    return response.status(StatusCodes.OK).json(order);
});

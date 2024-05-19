import { RequestHandler } from 'express';
import { OrderSchema } from '../utils/zod/schemas';
import { create } from '../services/Order/create';

export const Create: RequestHandler = async (req, res) => {
  const body = OrderSchema.safeParse(req.body);

  if (!body.success)
    return res.json(
      body.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }))
    );

  const order = await create(body.data);
  return res.json(order)
};

import { RequestHandler } from 'express';
import { OrderSchema } from '../utils/zod/schemas';
import { create } from '../services/Order/create';
import { getAll } from '../services/Order/getAll';
import { deleteOrder } from '../services/Order/deleteOrder';

export const Create: RequestHandler = async (req, res) => {
  const body = OrderSchema.safeParse(req.body);

  if (!body.success)
    return res.json(
      body.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }))
    );
  const userId = req.userId;
  const order = await create({ ...body.data, userId });
  return res.json(order);
};
export const GetAll: RequestHandler = async (req, res) => {
  const userId = req.userId;
  const orders = await getAll(userId);
  return res.json(orders);
};
export const Delete: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await deleteOrder(id);
  return res.json({ message: `O Chamado ${id} foi deletado com êxito` });
};

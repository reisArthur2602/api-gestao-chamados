import { RequestHandler } from 'express';
import { OrderSchema, UpdateOrderSchema } from '../utils/zod/schemas';
import { create } from '../repositories/Order/create';
import { getAll } from '../repositories/Order/getAll';
import { deleteOrder } from '../repositories/Order/deleteOrder';
import { update } from '../repositories/Order/update';
import { StatusCodes } from 'http-status-codes';

export const Create: RequestHandler = async (req, res) => {
  const body = OrderSchema.safeParse(req.body);

  if (!body.success)  return res.status(StatusCodes.CONFLICT).json({ error: 'Preencha os campos corretamente' });
  
  const userId = req.userId;
  const order = await create({ ...body.data, userId });
  return res.status(StatusCodes.OK).json(order);
};
export const GetAll: RequestHandler = async (req, res) => {
  const userId = req.userId;
  const orders = await getAll(userId);
  return res.status(StatusCodes.OK).json(orders);
};
export const Delete: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await deleteOrder(id);
  return res.status(StatusCodes.OK).json({ message: `O Chamado ${id} foi deletado com êxito` });
};

export const Update: RequestHandler = async (req, res) => {
  const body = UpdateOrderSchema.safeParse(req.body);

  if (!body.success)  return res.status(StatusCodes.CONFLICT).json({ error: 'Preencha os campos corretamente' });
   
  await update(body.data);
  return res.status(StatusCodes.OK).json({
    message: `O Chamado ${body.data.id} foi atualizado com êxito`,
  });
};

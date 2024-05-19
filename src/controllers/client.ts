import { RequestHandler } from 'express';
import { ClientSchema } from '../utils/zod/schemas';
import { create } from '../services/Client/create';
import { getAll } from '../services/Client/getAll';

export const Create: RequestHandler = async (req, res) => {
  const body = ClientSchema.safeParse(req.body);

  if (!body.success)
    return res.json(
      body.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }))
    );
  const userId = req.userId;
  
  const client = await create({ ...body.data, userId });
  if (!client)
    return res.json({ error: 'Este email/cpf/telefone já está em uso' });

  return res.json(client);
};

export const GetAll: RequestHandler = async (req, res) => {
  const userId = req.userId;
  const clients = await getAll(userId);
  return res.json(clients);
};

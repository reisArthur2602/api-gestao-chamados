import { RequestHandler } from 'express';
import { ClientSchema } from '../utils/zod/schemas';
import { create } from '../services/Client/create';

export const Create: RequestHandler = async (req, res) => {
  const body = ClientSchema.safeParse(req.body);

  if (!body.success)
    return res.json(
      body.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }))
    );

  const client = await create(body.data);
  if (!client)
    return res.json({ error: 'Este email/cpf/telefone já está em uso' });

  return res.json(client);
};

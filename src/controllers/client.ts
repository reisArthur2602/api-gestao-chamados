import { RequestHandler } from 'express';
import { ClientSchema, UpdateClientSchema } from '../utils/zod/schemas';
import { create } from '../services/Client/create';
import { getAll } from '../services/Client/getAll';
import { deleteClient } from '../services/Client/deleteClient';
import { update } from '../services/Client/update';

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

export const Delete: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await deleteClient(id);
  return res.json({ message: `O Cliente ${id} foi deletado com êxito` });
};

export const Update: RequestHandler = async (req, res) => {
  const body = UpdateClientSchema.safeParse(req.body);

  if (!body.success)
    return res.json(
      body.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }))
    );

  await update(body.data);
  return res.json({
    message: `O Cliente ${body.data.id} foi atualizado com êxito`,
  });
};

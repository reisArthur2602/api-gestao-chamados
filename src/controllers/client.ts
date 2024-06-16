import { RequestHandler } from 'express';
import { ClientSchema, UpdateClientSchema } from '../utils/zod/schemas';
import { create } from '../repositories/Client/create';
import { getAll } from '../repositories/Client/getAll';
import { deleteClient } from '../repositories/Client/deleteClient';
import { update } from '../repositories/Client/update';
import { StatusCodes } from 'http-status-codes';

export const Create: RequestHandler = async (req, res) => {
  const body = ClientSchema.safeParse(req.body);

  if (!body.success)
    return res.status(StatusCodes.CONFLICT).json({ error: 'Preencha os campos corretamente' });

  const userId = req.userId;

  const client = await create({ ...body.data, userId });
  if (!client) return res.status(StatusCodes.CONFLICT).json({ error: 'Email/CPF/Telefone já está em uso' });

  return res.status(StatusCodes.OK).json(client);
};

export const GetAll: RequestHandler = async (req, res) => {
  const userId = req.userId;
  const clients = await getAll(userId);
  return res.status(StatusCodes.OK).json(clients);
};

export const Delete: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await deleteClient(id);
  return res.status(StatusCodes.OK).json({ message: `O Cliente ${id} foi deletado com êxito` });
};

export const Update: RequestHandler = async (req, res) => {
  const body = UpdateClientSchema.safeParse(req.body);

  if (!body.success)
    return res.status(StatusCodes.CONFLICT).json({ error: 'Preencha os campos corretamente' });

  await update(body.data);
  return res.status(StatusCodes.OK).json({
    message: `O Cliente ${body.data.id} foi atualizado com êxito`,
  });
};

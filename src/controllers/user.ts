import { RequestHandler } from 'express';
import { create } from '../services/User/create';
import { AuthUserSchema, CreateUserSchema } from '../utils/zod/schemas';
import { compare } from 'bcryptjs';
import { auth } from '../services/User/auth';
import { db } from '../database/Client';
import { details } from '../services/User/details';

export const Create: RequestHandler = async (req, res) => {
  const body = CreateUserSchema.safeParse(req.body);

  if (!body.success)
    return res.json({ error: 'Preencha os campos corretamente' });

  const user = await create(body.data);
  if (!user) return res.json({ error: 'Este email já está em uso' });

  return res.json(user);
};

export const Auth: RequestHandler = async (req, res) => {
  const body = AuthUserSchema.safeParse(req.body);

  if (!body.success)
    return res.json({ error: 'Preencha os campos corretamente' });

  const user = await db.user.findFirst({ where: { email: body.data.email } });
  if (!user) return res.json({ error: 'Usuário não encontrado' });

  const passwordMatch = await compare(body.data.password, user.password);
  if (!passwordMatch) return res.json({ error: 'Senha incorreta' });

  const authUser = await auth(user);
  return res.json(authUser);
};

export const Details: RequestHandler = async (req, res) => {
  const user_id = req.userId;

  const user = await details(user_id);
  return res.json(user);
};

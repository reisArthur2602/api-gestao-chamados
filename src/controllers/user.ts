import { RequestHandler } from 'express';
import { existsUser } from '../services/User/existsUser';
import { create } from '../services/User/create';
import { AuthUserSchema, CreateUserSchema } from '../utils/zod/schemas';
import { compare } from 'bcryptjs';
import { auth } from '../services/User/auth';

export const Create: RequestHandler = async (req, res) => {
  const body = CreateUserSchema.safeParse(req.body);

  if (!body.success)
    return res.json(
      body.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }))
    );

  const verifyUser = await existsUser(body.data.email);

  if (verifyUser) return res.json({ error: 'O Usuário já está cadastrado' });

  const user = await create(body.data);

  return res.json(user);
};

export const Auth: RequestHandler = async (req, res) => {
  const body = AuthUserSchema.safeParse(req.body);

  if (!body.success)
    return res.json(
      body.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }))
    );

  const user = await existsUser(body.data.email);
  if (!user) return res.json({ error: 'Usuário nao encontrado' });

  const passwordMatch = await compare(body.data.password, user.password);
  if (!passwordMatch) return res.json({ error: 'Senha incorreta' });

  const authUser = await auth({ ...user });
  return res.json(authUser);
};

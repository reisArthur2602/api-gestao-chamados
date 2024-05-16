import { RequestHandler } from 'express';
import { existsUser } from '../services/User/existsUser';
import { create } from '../services/User/create';
import { UserSchema } from '../utils/zod/schemas';

export const Create: RequestHandler = async (req, res) => {
  const body = UserSchema.safeParse(req.body);

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




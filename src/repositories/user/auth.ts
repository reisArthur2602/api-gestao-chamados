import { sign } from 'jsonwebtoken';

import { db } from '../../database/Client';
import { compare } from 'bcryptjs';
import { UserData, UserProps } from '../../domain/models/user';

export const AuthUserRepository = async (
  data: Omit<UserProps, 'username'>
): Promise<UserData> => {
  const user = await db.user.findFirst({ where: { email: data.email } });
  if (!user) throw new Error('Email/Senha incorreto(a)');

  const passwordMatch = await compare(data.password, user.password);
  if (!passwordMatch) throw new Error('Email/Senha incorreto(a)');

  const keyJWT = process.env.JWT_SECRET as string;

  const token = sign(
    {
      name: user.username,
      email: user.email,
    },
    keyJWT,
    { subject: user.id, expiresIn: '30d' }
  );

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    token,
  };
};

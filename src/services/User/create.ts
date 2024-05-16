import { User } from '@prisma/client';
import { db } from '../../database/Client';
import { UserProps } from './protocols';

export const create = async (data: UserProps): Promise<User | false> => {
  try {
    const user = await db.user.create({ data: data });
    return user;
  } catch (error) {
    console.error('Erro ao cadastrar usuário', error);
    return false;
  }
};

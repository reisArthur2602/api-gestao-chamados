import { db } from '../../database/Client';
import { UserData, UserProps } from './protocols';
import { hash } from 'bcryptjs';

export const create = async (data: UserProps): Promise<UserData | false> => {
  try {
    const passwordHash = await hash(data.password, 8);

    const user = await db.user.create({
      data: { ...data, password: passwordHash },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Erro ao cadastrar usuário', error);
    return false;
  }
};

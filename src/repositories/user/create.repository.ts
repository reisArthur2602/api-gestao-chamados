import { db } from '../../database/Client';
import { UserData, UserProps } from '../../models/user';

import { hash } from 'bcryptjs';

export const CreateUserRepository = async (
  data: UserProps
): Promise<Omit<UserData, 'token'>> => {
  const existsUser = await db.user.findFirst({ where: { email: data.email } });

  if (existsUser) {
    throw new Error('Este email já está sendo usado');
  }

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
};

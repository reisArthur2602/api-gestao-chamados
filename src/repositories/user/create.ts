import { db } from '../../database/Client';
import { UserData, UserProps } from '../../models/user';

import { hash } from 'bcryptjs';

export const CreateUserRepository = async (
  data: UserProps
): Promise<Omit<UserData, 'token'>> => {
  const passwordHash = await hash(data.password, 8);

  return await db.user
    .create({
      data: { ...data, password: passwordHash },
      select: {
        id: true,
        email: true,
        username: true,
      },
    })
    .then((res) => res)
    .catch(() => {
      throw new Error('Este email já está sendo usado');
    });
};

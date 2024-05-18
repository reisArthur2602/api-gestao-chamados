import { User } from '@prisma/client';
import { db } from '../../database/Client';

export const existsUser = async (email: string): Promise<User | false> => {
  const user = await db.user.findFirst({
    where: { email },
  });

  return user || false;
};

import { db } from '../../database/Client';

export const existsUser = async (email: string): Promise<Boolean> => {
  const exists = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  return exists ? true : false;
};

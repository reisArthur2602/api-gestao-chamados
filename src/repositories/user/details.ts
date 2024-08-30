import { db } from '../../database/Client';
import { UserData } from '../../domain/models/user';

export const DetailsUserRepository = async (
  id: string
): Promise<Omit<UserData, 'token'>> => {
  const user = await db.user.findUnique({
    where: { id: id },
    select: { id: true, email: true, username: true },
  });
  if (!user) throw new Error('Usuario não foi encontrado');

  return user;
};

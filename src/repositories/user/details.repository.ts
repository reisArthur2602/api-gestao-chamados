import { db } from '../../database/Client';
import { UserData } from '../../models/user';

export const DetailsUserRepository = async (
  userid: string
): Promise<Omit<UserData, 'token'>> => {
  const user = await db.user.findUnique({
    where: { id: userid },
    select: { id: true, email: true, username: true },
  });
  if (!user) throw new Error('O Usuário não está autenticado');

  return user;
};

import { db } from '../../database/Client';
import { UserData } from './protocols';

export const details = async (
  user_id: string
): Promise<UserData | false | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id: user_id },
      select: { id: true, email: true, username: true },
    });
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário', error);
    return false;
  }
};

import { sign } from 'jsonwebtoken';
import { AuthData, AuthProps } from './protocols';

export const auth = async (data: AuthProps): Promise<AuthData | false> => {
  if (!process.env.JWT_SECRET) return false;

  const token = sign(
    {
      name: data.username,
      email: data.email,
    },
    process.env.JWT_SECRET,
    { subject: data.id, expiresIn: '30d' }
  );

  return {
    id: data.id,
    username: data.username,
    email: data.email,
    token,
  };
};

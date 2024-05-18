import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
interface Payload {
  sub: string;
}
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!process.env.JWT_SECRET) return false;

  const authToken = req.headers.authorization;
  if (!authToken) return res.json({ error: 'o usuário não está autenticado' });

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.json({ message: 'o usuário não está autenticado' });
  }
};

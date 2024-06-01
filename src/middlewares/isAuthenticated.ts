import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
interface Payload {
  sub: string;
}
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!process.env.JWT_SECRET) return false;

  const authToken = req.headers.authorization;
  if (!authToken)
    return res.status(StatusCodes.UNAUTHORIZED).json({ notallowed: 'o usuário não está autenticado' });

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    req.userId = sub;
    return next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ notallowed: 'o usuário não está autenticado' });
  }
};

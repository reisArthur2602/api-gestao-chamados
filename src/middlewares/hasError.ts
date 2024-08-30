import { NextFunction, Response, Request } from 'express';

import { ZodError } from 'zod';
import { AplicationError, BadRequestError } from '../helpers/error';
import { StatusCodes } from 'http-status-codes';

export const hasError = (
    error: Error & Partial<AplicationError>,
    reques: Request,
    response: Response,
    next: NextFunction
) => {
    if (error instanceof ZodError)
        return response
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: 'Preencha dos dados corretamente' });

    const statusCode = error.statusCode ?? 500;
    const message = error.message ?? 'Internal Server Error';
    console.error({ message });
    return response.status(statusCode).json({ message });
};

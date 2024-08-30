import { NextFunction, Response, Request } from 'express';

import { ZodError } from 'zod';
import { AplicationError } from '../helpers/error';

export const hasError = (
    error: Error & Partial<AplicationError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.message ?? 'Internal Server Error';
    console.error({ message });
    return res.status(statusCode).json({ message });
};

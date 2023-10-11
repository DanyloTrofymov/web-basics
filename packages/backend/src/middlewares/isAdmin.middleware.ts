import { Request, Response, NextFunction } from 'express';
import { ERRORS, HttpError } from '../utils/error.util';

export function isAdmin() {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.user?.isAdmin) {
      throw new HttpError(403, 'Auth error', ERRORS.UNAUTHORIZED);
    }

    next();
  };
}

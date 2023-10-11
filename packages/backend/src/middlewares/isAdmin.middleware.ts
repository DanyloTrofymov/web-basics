import { Request, Response, NextFunction } from 'express';
import { ERRORS, HttpError } from '../utils/error.util';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.body.user && req.body.user.isAdmin === true) {
    next();
  } else {
    throw new HttpError(403, 'Auth error', ERRORS.UNAUTHORIZED);
  }
}

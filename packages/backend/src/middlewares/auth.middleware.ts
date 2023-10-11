import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/users.type';
import { ERRORS, HttpError } from '../utils/error.util';

passport.use(
  new BearerStrategy(
    (token: string, done: (error: string | unknown, user?: string | JwtPayload) => void) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return done(null, decoded);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('bearer', { session: false }, (error: string, user: IUser) => {
    if (error) {
      throw new HttpError(403, 'Auth error', ERRORS.BAD_TOKEN);
    }
    if (!user) {
      throw new HttpError(403, 'Auth error', ERRORS.UNAUTHORIZED);
    }

    req.body.user = user;

    next();
  })(req, res, next);
};

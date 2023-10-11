import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { HttpError } from '../utils/error.util';

export function validateBodyMiddleware(schema: Joi.ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new HttpError(400, error.details.map((detail) => detail.message).join(', '));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

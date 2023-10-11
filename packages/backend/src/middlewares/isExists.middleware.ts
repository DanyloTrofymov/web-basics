import { Request, Response, NextFunction } from 'express';
import { BaseEntity, FindOptionsWhere } from 'typeorm';
import { HttpError, ERRORS } from '../utils/error.util';

export function isExists<T extends BaseEntity>(model: typeof BaseEntity) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const item = await model.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
      if (!item) {
        throw new HttpError(400, `${model.name} does not exist`, ERRORS.NOT_FOUND(model.name), {
          id
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

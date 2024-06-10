import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';

import { HttpStatus } from '~/constants/http';
import { EntityError, ErrorWithStatus } from '~/models/Errors';

export const defaultErrorHandler = (
  err: EntityError | ErrorWithStatus | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ErrorWithStatus) {
    return res
      .status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
      .json(omit(err, 'status'));
  }

  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true });
  });

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfo: omit(err, ['stack'])
  });
};

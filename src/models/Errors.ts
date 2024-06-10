import { HttpStatus } from '~/constants/http';
import { RequireByKeys } from '~/utils/types';

type ErrorType = Record<
  string,
  {
    msg: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
>;

export class ErrorWithStatus {
  message: string;
  status: number;

  constructor({ message, status }: ErrorWithStatus) {
    this.message = message;
    this.status = status;
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorType;

  constructor({
    message = 'Somethings went wrong',
    errors
  }: RequireByKeys<Omit<EntityError, 'status'>, 'errors'>) {
    super({
      message,
      status: HttpStatus.UNPROCESSABLE_ENTITY
    });

    this.errors = errors;
  }
}

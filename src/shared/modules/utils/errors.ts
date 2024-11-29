import { ZodError } from 'zod';

export class AppError extends Error {
  public readonly isOperational: boolean;

  constructor(message: string, isOperational: boolean = true) {
    super(message);
    this.name = 'AppError';
    this.isOperational = isOperational;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static from(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    } else if (error instanceof ZodError) {
      const message =
        'Erro de validação: ' +
        error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
      return new AppError(message, true);
    } else if (error instanceof Error) {
      return new AppError(error.message, true);
    } else {
      return new AppError('Erro desconhecido', false);
    }
  }

  logError() {
    if (this.isOperational) {
      console.error(`[${this.name}] - ${this.message}`);
    } else {
      console.error(`[${this.name}] - Erro crítico: ${this.message}`);
    }

    if (this.stack) {
      console.error(this.stack);
    }
  }
}

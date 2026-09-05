import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiFieldErrorDto } from '../dto/api-response.dto';
import { createLogger } from '../logger/app.logger';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = createLogger('HTTP');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ method?: string; originalUrl?: string }>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong. Please try again.';
    let errors: ApiFieldErrorDto[] = [];

    let logged = false;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const body = exceptionResponse as Record<string, unknown>;
        message = (body.message as string) ?? message;

        if (Array.isArray(body.message)) {
          errors = body.message.map((item: string) => ({
            field: 'request',
            message: item,
          }));
          message = 'Validation failed';
          this.logger.warn(
            `${request.method ?? 'HTTP'} ${request.originalUrl ?? ''} ${statusCode} — ${message}: ${body.message.join('; ')}`,
          );
          logged = true;
        }

        if (Array.isArray(body.errors)) {
          errors = body.errors as ApiFieldErrorDto[];
          if (!logged) {
            this.logger.warn(
              `${request.method ?? 'HTTP'} ${request.originalUrl ?? ''} ${statusCode} — ${message}: ${errors.map((e) => `${e.field}: ${e.message}`).join('; ')}`,
            );
            logged = true;
          }
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(
        `${request.method ?? 'HTTP'} ${request.originalUrl ?? ''} — ${exception.message}`,
        exception.stack,
      );
    }

    if (!logged && statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method ?? 'HTTP'} ${request.originalUrl ?? ''} ${statusCode} — ${message}`,
      );
    } else if (!logged && statusCode >= HttpStatus.BAD_REQUEST) {
      this.logger.warn(
        `${request.method ?? 'HTTP'} ${request.originalUrl ?? ''} ${statusCode} — ${message}`,
      );
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data: null,
      ...(errors.length > 0 ? { errors } : {}),
    });
  }
}

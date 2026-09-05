import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { createLogger } from '../logger/app.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = createLogger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      method: string;
      originalUrl: string;
      user?: { sub?: string; role?: string };
    }>();
    const started = Date.now();
    const { method, originalUrl } = request;
    const userTag = request.user?.sub
      ? ` user=${request.user.sub.slice(0, 8)}… role=${request.user.role ?? 'unknown'}`
      : '';

    this.logger.debug(`→ ${method} ${originalUrl}${userTag}`);

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse<{ statusCode: number }>();
        const durationMs = Date.now() - started;
        this.logger.info(
          `${method} ${originalUrl} ${response.statusCode} ${durationMs}ms${userTag}`,
        );
      }),
      catchError((error: { status?: number; message?: string }) => {
        const durationMs = Date.now() - started;
        const status = error.status ?? 500;
        this.logger.warn(
          `${method} ${originalUrl} ${status} ${durationMs}ms${userTag} — ${error.message ?? 'error'}`,
        );
        return throwError(() => error);
      }),
    );
  }
}

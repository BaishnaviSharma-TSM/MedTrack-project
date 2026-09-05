import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponseDto } from '../dto/api-response.dto';

export interface ResponsePayload<T = unknown> {
  message?: string;
  data: T;
  pagination?: ApiResponseDto['pagination'];
  statusCode?: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((payload: T | ResponsePayload<T>) => {
        if (
          payload &&
          typeof payload === 'object' &&
          'data' in (payload as ResponsePayload<T>)
        ) {
          const wrapped = payload as ResponsePayload<T>;
          const statusCode = wrapped.statusCode ?? response.statusCode;

          return {
            success: true,
            statusCode,
            message: wrapped.message ?? 'Request successful',
            data: wrapped.data,
            ...(wrapped.pagination ? { pagination: wrapped.pagination } : {}),
          };
        }

        return {
          success: true,
          statusCode: response.statusCode,
          message: 'Request successful',
          data: payload as T,
        };
      }),
    );
  }
}

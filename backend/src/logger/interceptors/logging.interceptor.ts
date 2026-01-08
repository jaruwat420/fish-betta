import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const startTime = Date.now();

    // Log request
    this.logger.log(`→ ${method} ${url}`);

    return next.handle().pipe(
      tap({
        next: (response) => {
          const responseTime = Date.now() - startTime;
          const statusCode = context.switchToHttp().getResponse().statusCode;

          // Log response
          this.logger.log(
            `← ${method} ${url} ${statusCode} - ${responseTime}ms`,
          );

          // Log to LoggerService
          this.loggerService.logApiRequest(
            method,
            url,
            statusCode,
            responseTime,
            {
              ip,
              userAgent,
            },
          );
        },
        error: (error) => {
          const responseTime = Date.now() - startTime;

          // Log error
          this.logger.error(
            `✗ ${method} ${url} - ${error.status || 500} - ${responseTime}ms`,
          );

          // Log to LoggerService
          this.loggerService.logApiRequest(
            method,
            url,
            error.status || 500,
            responseTime,
            {
              ip,
              userAgent,
              error: error.message,
            },
          );
        },
      }),
    );
  }
}

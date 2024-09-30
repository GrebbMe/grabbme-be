import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public constructor(private logger: Logger) {}

  public intercept(
    context: ExecutionContext,

    next: CallHandler<unknown>,
  ): Observable<unknown> | Promise<Observable<unknown>> {
    const { body } = context.getArgByIndex(0);
    this.logger.log(`Request \n ${body ? `Request : ${JSON.stringify(body)}` : ''}`);

    return next.handle().pipe(
      tap((data) => {
        this.logger.log(`Response\n Response : ${data ? JSON.stringify(data) : ''}`);
      }),
    );
  }
}

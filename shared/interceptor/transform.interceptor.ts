import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { responseMessageKey } from '@shared/decorator/set-response.decorator';
import { CustomRes } from '@shared/filter/custom-res';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, CustomRes<T>> {
  public constructor(private reflector: Reflector) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<CustomRes<T>> | Promise<Observable<CustomRes<T>>> {
    const response = this.reflector.get<{ message: string; status: number }>(
      responseMessageKey,
      context.getHandler(),
    );

    const status = response.status ?? context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data: T): CustomRes<T> => {
        const responseData = data as { message: string; status: number };
        return {
          status: status ? (responseData.status >= 400 ? responseData.status : status) : 'error',
          data: responseData.status >= 400 ? null : data,
          message: responseData.status >= 400 ? responseData.message : response.message,
        };
      }),
    );
  }
}

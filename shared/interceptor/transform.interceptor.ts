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

    const status = response.status
      ? response.status
      : context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data): CustomRes<T> => {
        return {
          // eslint-disable-next-line dot-notation
          status: status ? (data['status'] >= 400 ? data['status'] : status) : 'error',
          // eslint-disable-next-line dot-notation
          data: data['status'] >= 400 ? null : data,
          // eslint-disable-next-line dot-notation
          message: data['status'] >= 400 ? data['message'] : response.message,
        };
      }),
    );
  }
}

import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { CustomRpcException } from './custom-rpc-exception';

@Catch(CustomRpcException)
export class MicroRpcExceptionFilter implements RpcExceptionFilter<CustomRpcException> {
  public catch(exception: CustomRpcException, host: ArgumentsHost): Observable<unknown> {
    return throwError(() => {
      return {
        message: exception.message,
        status: exception.status,
      };
    });
  }
}

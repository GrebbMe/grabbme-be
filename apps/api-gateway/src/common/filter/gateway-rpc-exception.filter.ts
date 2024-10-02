import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomRpcException } from '@shared/filter/custrom-rpc-exception';

@Catch()
export class GatewayRpcExceptionFilter implements ExceptionFilter<CustomRpcException> {
  public constructor(private readonly httpAdpterHost: HttpAdapterHost) {}

  public catch(exception: CustomRpcException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdpterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception.status ? exception.status : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = {
      status: httpStatus,
      timeStamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message,
    };

    httpAdapter.reply(ctx.getResponse(), response, httpStatus);
  }
}

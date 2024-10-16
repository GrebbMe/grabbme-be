import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomRpcException } from '@shared/filter/custom-rpc-exception';

@Catch()
export class GatewayRpcExceptionFilter implements ExceptionFilter<CustomRpcException> {
  public constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  public catch(exception: CustomRpcException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception.status ?? HttpStatus.INTERNAL_SERVER_ERROR;

    const response = {
      status: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message,
    };

    httpAdapter.reply(ctx.getResponse(), response, httpStatus);
  }
}

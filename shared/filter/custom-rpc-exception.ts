import { RpcException } from '@nestjs/microservices';

export class CustomRpcException extends RpcException {
  public readonly status: number;
  public readonly message: string;

  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  public getError() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

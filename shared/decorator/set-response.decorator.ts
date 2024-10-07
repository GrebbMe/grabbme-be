import { SetMetadata } from '@nestjs/common';

export const responseMessageKey: string = 'ResponseMessageKey';
export const SetResponse = (message: string, status: number) =>
  SetMetadata(responseMessageKey, { message, status });

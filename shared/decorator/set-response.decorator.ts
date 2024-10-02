import { SetMetadata } from '@nestjs/common';

export const responseMessageKey: string = 'ResponseMessageKey';
export const setResponse = (message: string, status: number) =>
  SetMetadata(responseMessageKey, { message, status });

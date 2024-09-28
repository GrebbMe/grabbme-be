import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class BasicReqDto {
  @Type(() => Number)
  @IsInt()
  public id: number;
}

import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  public readonly name: string;
}

export class GetChatRoomsByIdDto {
  @Type(() => Number)
  @IsInt()
  public readonly id: number;
}

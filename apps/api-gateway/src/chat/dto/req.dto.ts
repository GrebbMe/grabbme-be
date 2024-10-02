import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  public readonly name: string;
}

export class GetChatRoomsDto {
  @Type(() => Number)
  @IsInt()
  public readonly id: number;
}

export class GetChatListDto {
  @IsInt()
  public readonly id: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  public readonly page?: number = 0;
}

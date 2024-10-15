import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class CreateChatRoomDto {
  @IsInt()
  public readonly postId: number;

  @IsInt()
  public readonly senderId: number;

  @IsInt()
  public readonly receiverId: number;
}

export class GetChatRoomsDto {
  @Type(() => Number)
  @IsInt()
  public readonly id: number;
}

export class GetChatRoomDto {
  @Type(() => Number)
  @IsInt()
  public readonly id: number;
}

export class GetChatListDto {
  @IsInt()
  public readonly id: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public readonly page?: number = 1;
}

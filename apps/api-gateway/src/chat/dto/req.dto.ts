import { IsString } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  public readonly name: string;
}

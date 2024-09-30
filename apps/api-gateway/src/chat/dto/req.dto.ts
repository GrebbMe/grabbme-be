import { IsString } from "class-validator";

export class CreateChatRoomDto {
    @IsString()
    readonly name: string;
}

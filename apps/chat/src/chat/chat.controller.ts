import {
  CreateChatRoomDto,
  GetChatListDto,
  GetChatRoomDto,
  GetChatRoomsDto,
} from '@apps/api-gateway/src/chat/dto/req.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @MessagePattern(MESSAGE.CHAT.CREATE_CHAT_ROOM)
  public createChatRoom(@Payload() { name }: CreateChatRoomDto) {
    return this.chatService.createChatRoom(name);
  }

  @MessagePattern(MESSAGE.CHAT.GET_CHAT_ROOMS)
  public async getChatRooms(@Payload() { id }: GetChatRoomsDto) {
    return await this.chatService.getChatRooms(id);
  }

  @MessagePattern(MESSAGE.CHAT.GET_CHAT_ROOM)
  public async getChatRoom(@Payload() { id }: GetChatRoomDto) {
    return await this.chatService.getChatRoom(id);
  }

  @MessagePattern(MESSAGE.CHAT.GET_CHAT_LIST)
  public async getChatList(@Payload() { id, page }: GetChatListDto) {
    return await this.chatService.getChatList(id, page);
  }
}

import {
  CreateChatRoomDto,
  GetChatListDto,
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
  public createChatRoom(@Payload() createChatRoomDto: CreateChatRoomDto) {
    return this.chatService.createChatRoom(createChatRoomDto.name);
  }

  @MessagePattern(MESSAGE.CHAT.GET_ALL_CHAT_ROOM)
  public async getChatRooms(@Payload() getChatRoomsDto: GetChatRoomsDto) {
    return await this.chatService.getChatRooms(getChatRoomsDto.id);
  }

  @MessagePattern(MESSAGE.CHAT.GET_ONE_CHAT_LIST)
  public async getChatList(@Payload() getChatListDto: GetChatListDto) {
    return await this.chatService.getChatList(getChatListDto.id, getChatListDto.page);
  }
}

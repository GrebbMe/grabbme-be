import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { SetResponse } from '@shared/decorator/set-response.decorator';
import { LoggingInterceptor } from '@shared/interceptor/message-logging.interceptor';
import { TransformInterceptor } from '@shared/interceptor/transform.interceptor';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, GetChatListDto, GetChatRoomDto, GetChatRoomsDto } from './dto/req.dto';

@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller()
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @SetResponse(MESSAGE.CHAT.CREATE_CHAT_ROOM.cmd, HttpStatus.CREATED)
  @MessagePattern(MESSAGE.CHAT.CREATE_CHAT_ROOM)
  public createChatRoom(@Payload() { postId, senderId, receiverId }: CreateChatRoomDto) {
    return this.chatService.createChatRoom(postId, senderId, receiverId);
  }

  @SetResponse(MESSAGE.CHAT.GET_CHAT_ROOMS.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.CHAT.GET_CHAT_ROOMS)
  public async getChatRooms(@Payload() { id }: GetChatRoomsDto) {
    return await this.chatService.getChatRooms(id);
  }

  @SetResponse(MESSAGE.CHAT.GET_CHAT_ROOM.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.CHAT.GET_CHAT_ROOM)
  public async getChatRoom(@Payload() { id }: GetChatRoomDto) {
    return await this.chatService.getChatRoom(id);
  }

  @SetResponse(MESSAGE.CHAT.GET_CHAT_LIST.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.CHAT.DELETE_CHAT_ROOM)
  public async deleteChatRoom(@Payload() { id }: GetChatRoomDto) {
    return await this.chatService.deleteChatRoom(id);
  }

  @SetResponse(MESSAGE.CHAT.GET_CHAT_LIST.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.CHAT.GET_CHAT_LIST)
  public async getChatList(@Payload() { id, page }: GetChatListDto) {
    return await this.chatService.getChatList(id, page);
  }
}

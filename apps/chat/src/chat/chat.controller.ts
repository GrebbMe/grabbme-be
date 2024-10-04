import { CreateChatRoomDto } from './dto/req.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { ChatService } from './chat.service';

//* 채팅 서비스의 HTTP 요청/응답 처리 Controller
@Controller()
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @MessagePattern(MESSAGE.CHAT.CREATE_CHAT_ROOM)
  public createChatRoom(@Payload() createChatRoomDto: CreateChatRoomDto) {
    return this.chatService.createChatRoom(createChatRoomDto.name);
  }
}

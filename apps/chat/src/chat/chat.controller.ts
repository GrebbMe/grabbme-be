import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';

//* 채팅 서비스의 HTTP 요청/응답 처리 Controller
@Controller()
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @MessagePattern({ cmd: 'create_room' })
  public createRoom(@Payload() { roomName }: { roomName: string }) {
    return this.chatService.createRoom(roomName);
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/req.dto';

@Controller('chat')
@ApiTags('Chat API')
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @Post('create-chat-room')
  public createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatService.createChatRoom(createChatRoomDto.name);
  }
}

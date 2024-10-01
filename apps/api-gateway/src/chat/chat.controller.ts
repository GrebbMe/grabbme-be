import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, GetChatRoomsByIdDto } from './dto/req.dto';

@Controller('chat')
@ApiTags('Chat API')
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @Post('create-chat-room')
  public createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatService.createChatRoom(createChatRoomDto.name);
  }

  @Get('chat-rooms/:id')
  public async getChatRoomsById(@Param() { id }: GetChatRoomsByIdDto) {
    return await this.chatService.getChatRoomsById(id);
  }
}

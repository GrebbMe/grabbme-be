import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, GetChatListDto, GetChatRoomsByIdDto } from './dto/req.dto';

@Controller('chat')
@ApiTags('Chat API')
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @Post('chat-rooms')
  public createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatService.createChatRoom(createChatRoomDto.name);
  }

  @Get('chat-rooms/:id')
  public async getChatRoomsById(@Param() { id }: GetChatRoomsByIdDto) {
    return await this.chatService.getChatRoomsById(id);
  }

  @Get('chat-lists/:id')
  public getChatList(@Param() { id }: GetChatListDto, @Query() { page }: GetChatListDto) {
    return this.chatService.getChatList(id, page);
  }
}

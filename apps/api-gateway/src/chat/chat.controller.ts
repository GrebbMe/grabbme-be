import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, GetChatListDto, GetChatRoomDto, GetChatRoomsDto } from './dto/req.dto';

@Controller('chat')
@ApiTags('Chat API')
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @Post('chat-rooms')
  public createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatService.createChatRoom(createChatRoomDto.name);
  }

  @Get('chat-rooms')
  public getChatRooms(@Body() { id }: GetChatRoomsDto) {
    //TODO: id값은 userId로 인증/인가 절차 구현시 삭제 예정
    return this.chatService.getChatRooms(id);
  }

  @Get('chat-rooms/:id')
  public getChatRoom(@Param() { id }: GetChatRoomDto) {
    return this.chatService.getChatRoom(id);
  }

  @Get('chat-lists/:id')
  public getChatList(@Param() { id }: GetChatListDto, @Query() { page }: GetChatListDto) {
    return this.chatService.getChatList(id, page);
  }
}

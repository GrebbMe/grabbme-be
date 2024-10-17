import { Controller, Post, Get, Body, Param, Query, Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, GetChatListDto } from './dto/req.dto';
import { ChatRoom } from './entities/chat-room.entity';

@Controller('chat')
@ApiTags('Chat API')
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ summary: '채팅방 생성' })
  @ApiCreatedResponse({
    description: '새로운 채팅방이 생성되었습니다.',
    type: ChatRoom,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiBody({
    description: '새로 생성할 채팅방 정보',
    type: CreateChatRoomDto,
  })
  @Post('rooms')
  public createChatRoom(@Body() { postId, senderId, receiverId }: CreateChatRoomDto) {
    return this.chatService.createChatRoom(postId, senderId, receiverId);
  }

  @ApiOperation({ summary: '전체 채팅방 조회' })
  @ApiOkResponse({
    description: '전체 채팅방 조회',
    example: [
      {
        channel_id: 1,
        name: '채팅방 이름',
        post_id: 1,
        users: [1, 2],
        chat_lists: [
          {
            chat_list_id: 1,
            chats: [],
            created_at: '2024-10-03T00:00:12',
            updated_at: '2024-10-04T00:00:12',
          },
        ],
        last_chat: '마지막 채팅입니다.',
        created_at: '2024-10-03T00:00:12',
        updated_at: '2024-10-04T00:00:12',
      },
    ],
  })
  @Get('rooms')
  public getChatRooms(@Query('userId') userId: number) {
    //TODO: id값은 userId로 인증/인가 절차 구현시 삭제 예정
    return this.chatService.getChatRooms(userId);
  }

  @ApiOperation({ summary: '특정 채팅방 조회' })
  @ApiResponse({ description: '특정 채팅방이 조회되었습니다.' })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
  })
  @Get('rooms/:channelId')
  public getChatRoom(@Param('channelId') channelId: number, @Query('userId') userId: number) {
    return this.chatService.getChatRoom(channelId, userId);
  }
  @ApiOperation({ summary: '채팅방 삭제' })
  @ApiNoContentResponse({
    description: '채팅방 삭제 완료',
  })
  @Delete('rooms/:id')
  public async deleteChatRoom(@Param('id') id: number) {
    return this.chatService.deleteChatRoom(id);
  }

  @ApiOperation({ summary: '특정 채팅 리스트 조회' })
  @ApiResponse({ description: '특정 채팅 리스트가 조회되었습니다.' })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
  })
  @Get('lists/:id')
  public getChatList(@Param() { id }: GetChatListDto, @Query() { page }: GetChatListDto) {
    return this.chatService.getChatList(id, page);
  }
}

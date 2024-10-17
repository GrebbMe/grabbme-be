import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';

@Injectable()
export class ChatService {
  public constructor(@Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy) {}

  public createChatRoom(postId: number, senderId: number, receiverId: number) {
    return this.chatClient.send(MESSAGE.CHAT.CREATE_CHAT_ROOM, {
      postId,
      senderId,
      receiverId,
    });
  }

  public getChatRooms(id: number) {
    return this.chatClient.send(MESSAGE.CHAT.GET_CHAT_ROOMS, { id });
  }

  public getChatRoom(channelId: number, userId: number) {
    return this.chatClient.send(MESSAGE.CHAT.GET_CHAT_ROOM, { channelId, userId });
  }

  public deleteChatRoom(id: number) {
    return this.chatClient.send(MESSAGE.CHAT.DELETE_CHAT_ROOM, { id });
  }

  public getChatList(id: number, page: number) {
    return this.chatClient.send(MESSAGE.CHAT.GET_CHAT_LIST, { id, page });
  }
}

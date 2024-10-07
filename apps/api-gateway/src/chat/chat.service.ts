import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';

@Injectable()
export class ChatService {
  public constructor(@Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy) {}

  public createChatRoom(name: string) {
    return this.chatClient.send(MESSAGE.CHAT.CREATE_CHAT_ROOM, { name });
  }

  public getChatRooms(id: number) {
    return this.chatClient.send(MESSAGE.CHAT.GET_CHAT_ROOMS, { id });
  }

  public getChatRoom(id: number) {
    return this.chatClient.send(MESSAGE.CHAT.GET_CHAT_ROOM, { id });
  }

  public getChatList(id: number, page: number) {
    return this.chatClient.send(MESSAGE.CHAT.GET_CHAT_LIST, { id, page });
  }
}

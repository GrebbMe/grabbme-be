import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CHAT } from '@shared/constants/chat-constants';
import { Model } from 'mongoose';
import { ChatRoom } from './entity/chat-room.entity';

@Injectable()
export class ChatService {
  public constructor(@InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>) {}

  public async createChatRoom(chatRoomName: string) {
    const lastChatRoom = await this.chatRoomModel
      .findOne()
      .sort({ channel_id: CHAT.CHAT_ROOM_SORT_DESC })
      .exec();

    const newChatRoomId = lastChatRoom ? lastChatRoom.channel_id + 1 : 1;

    const createdChatRoom = await this.chatRoomModel.create({
      channel_id: newChatRoomId,
      name: chatRoomName,
      users: [],
      chat_lists: [],
    });

    return createdChatRoom;
  }
}

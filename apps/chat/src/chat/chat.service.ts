import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from './entity/chat-room.entity';

@Injectable()
export class ChatService {
  public constructor(@InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>) {}

  public async createRoom(roomName: string) {
    const lastRoom = await this.chatRoomModel.findOne().sort({ channel_id: -1 }).exec();

    const newRoomId = lastRoom ? lastRoom.channel_id + 1 : 1;

    const newRoom = new this.chatRoomModel({
      channel_id: newRoomId,
      name: roomName,
      users: [],
      chat_lists: [],
    });

    const createdRoom = await newRoom.save();
    return createdRoom;
  }
}

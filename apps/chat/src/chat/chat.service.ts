import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CHAT } from '@shared/constants/chat-constants';
import { Model } from 'mongoose';
import { ChatList } from './entities/chat-list.entity';
import { ChatRoom } from './entities/chat-room.entity';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  public constructor(
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>,
    @InjectModel(ChatList.name) private chatListModel: Model<ChatList>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
  ) {}
  public async createChatRoom(postId: number, senderId: number, receiverId: number) {
    const existingChatroom = await this.chatRoomModel
      .findOne({ post_id: postId })
      .populate({ path: 'users' })
      .populate({
        path: 'chat_lists',
        populate: { path: 'chats', model: 'Chat' },
      })
      .exec();

    const chatContent = `${senderId}님이 ${receiverId}님에게 채팅을 신청하였습니다.`;
    const newChatRoomId = await this.getNextId(this.chatRoomModel, 'channel_id');
    const newChatId = await this.getNextId(this.chatModel, 'chat_id');
    const newChatListId = await this.getNextId(this.chatListModel, 'chat_list_id');

    if (existingChatroom) {
      const isSenderInChatRoom = existingChatroom.users.includes(senderId);
      if (isSenderInChatRoom) {
        return existingChatroom;
      }
    } else {
      const newChat = await this.chatModel.create({
        chat_id: newChatId,
        sender_id: senderId,
        type: 'text',
        content: chatContent,
      });

      await this.chatListModel.create({
        chat_list_id: newChatListId,
        chats: [newChat],
      });

      const createdChatRoom = await this.chatRoomModel.create({
        channel_id: newChatRoomId,
        name: `${senderId}, ${receiverId}`,
        post_id: postId,
        last_chat: chatContent,
        users: [senderId, receiverId],
        chat_lists: [newChatListId],
      });

      return createdChatRoom;
    }
  }

  private async getNextId(model: Model<ChatList | ChatRoom | Chat>, key: string) {
    const lastDocument = await model
      .findOne()
      .sort({ [key]: CHAT.CHAT_ROOM_SORT_DESC })
      .exec();
    return lastDocument ? lastDocument[key] + 1 : 1;
  }

  public async getChatRooms(userId: number): Promise<ChatRoom[]> {
    const chatRooms = await this.chatRoomModel.find({ users: userId }).exec();
    if (chatRooms.length === 0) throw new NotFoundException('해당 채널에 대한 채팅방이 없습니다.');
    return chatRooms;
  }
  public async getChatRoom(channelId: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomModel.findOne({ channel_id: channelId }).exec();
    if (!chatRoom) throw new NotFoundException('해당 채널에 대한 채팅방이 없습니다.');
    return chatRoom;
  }
  public async getChatList(channelId: number, page: number): Promise<ChatList> {
    const chatRoom = await this.chatRoomModel.findOne({ channel_id: channelId }).exec();
    if (!chatRoom) throw new NotFoundException('해당 채널에 대한 채팅방이 없습니다.');
    const [chatList] = await this.chatListModel
      .find({ _id: { $in: chatRoom.chat_lists } })
      .sort({ created_at: CHAT.CHAT_LIST_SORT_DESC })
      .skip((page - 1) * CHAT.CHAT_LIST_PAGINATION_LIMIT)
      .limit(CHAT.CHAT_LIST_PAGINATION_LIMIT)
      .exec();
    if (!chatList) throw new NotFoundException('해당 채널에 대한 채팅 리스트가 없습니다.');

    return chatList;
  }

  public async saveMessage(chatRoomId: number, content: string, senderId: number) {
    const chatRoom = await this.chatRoomModel
      .findOne({ channel_id: chatRoomId })
      .populate({
        path: 'chat_lists',
        populate: { path: 'chats', model: 'Chat' },
      })
      .exec();

    if (!chatRoom) {
      throw new NotFoundException('채팅방을 찾을 수 없습니다.');
    }

    const newChatId = await this.getNextId(this.chatModel, 'chat_id');
    const newChat = await this.chatModel.create({
      chat_id: newChatId,
      sender_id: senderId,
      type: 'text',
      content: content,
    });

    if (!newChat) {
      throw new NotFoundException('생성된 채팅이 없습니다.');
    }

    const chatListId = chatRoom.chat_lists[chatRoom.chat_lists.length - 1];
    const chatList = await this.chatListModel.findOne({ chat_list_id: chatListId });

    if (!chatList || chatList.chats.length >= CHAT.CHAT_LIMIT_IN_CHAT_LIST) {
      const newChatListId = await this.getNextId(this.chatListModel, 'chat_list_id');
      await this.chatListModel.create({
        chat_list_id: newChatListId,
        chats: [newChat],
      });

      chatRoom.chat_lists.push(newChatListId);
      await chatRoom.save();
    } else {
      chatList.chats.push(newChat);
      await chatList.save();
    }
    return newChat;
  }
}

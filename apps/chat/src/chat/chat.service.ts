import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CHAT } from '@shared/constants/chat-constants';
import { CustomRpcException } from '@shared/filter/custom-rpc-exception';
import { Model } from 'mongoose';
import { Transactional } from 'typeorm-transactional';
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

  @Transactional()
  public async createChatRoom(postId: number, senderId: number, receiverId: number) {
    const existingChatroom = await this.chatRoomModel
      .findOne({ post_id: postId })
      .populate({ path: 'users' })
      .exec();

    if (existingChatroom) {
      const isSenderInChatRoom = existingChatroom.users.includes(senderId);
      if (!isSenderInChatRoom) {
        return existingChatroom;
      } else {
        return existingChatroom;
      }
    } else {
      const lastChatRoom = await this.chatRoomModel
        .findOne()
        .sort({ channel_id: CHAT.CHAT_ROOM_SORT_DESC })
        .exec();

      const newChatRoomId = lastChatRoom ? lastChatRoom.channel_id + 1 : 1;
      const createdChatRoom = await this.chatRoomModel.create({
        channel_id: newChatRoomId,
        name: `${senderId}, ${receiverId}`,
        post_id: postId,
        last_chat: `${senderId}님이 ${receiverId}님에게 채팅을 신청하였습니다.`,
        users: [senderId, receiverId],
        chat_lists: [],
      });

      if (!createdChatRoom) {
        throw new CustomRpcException(HttpStatus.NOT_FOUND, '생성된 채팅방이 없습니다.');
      }

      return createdChatRoom;
    }
  }

  @Transactional()
  public async getChatRooms(userId: number): Promise<ChatRoom[]> {
    const chatRooms = await this.chatRoomModel.find({ users: userId }).exec();

    if (chatRooms.length === 0) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '해당 채널에 대한 채팅방이 없습니다.');
    }

    return chatRooms;
  }

  @Transactional()
  public async getChatRoom(channelId: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomModel.findOne({ channel_id: channelId }).exec();

    if (!chatRoom) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '해당 채널에 대한 채팅방이 없습니다.');
    }

    return chatRoom;
  }

  @Transactional()
  public async getChatList(channelId: number, page: number): Promise<ChatList> {
    const chatRoom = await this.chatRoomModel.findOne({ channel_id: channelId }).exec();

    if (!chatRoom) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '해당 채널에 대한 채팅방이 없습니다.');
    }

    const [chatList] = await this.chatListModel
      .find({ _id: { $in: chatRoom.chat_lists } })
      .sort({ created_at: CHAT.CHAT_LIST_SORT_DESC })
      .skip((page - 1) * CHAT.CHAT_LIST_PAGINATION_LIMIT)
      .limit(CHAT.CHAT_LIST_PAGINATION_LIMIT)
      .exec();

    if (!chatList) {
      throw new CustomRpcException(
        HttpStatus.NOT_FOUND,
        '해당 채널에 대한 채팅 리스트가 없습니다.',
      );
    }

    return chatList;
  }

  @Transactional()
  public async saveMessage(chatRoomId: number, content: string, senderId: number) {
    const chatRoom = await this.chatRoomModel
      .findOne({ channel_id: chatRoomId })
      .populate({
        path: 'chat_lists',
        populate: { path: 'chats', model: 'Chat' },
      })
      .exec();

    if (!chatRoom) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '채팅방을 찾을 수 없습니다.');
    }

    const chatListId = chatRoom.chat_lists[chatRoom.chat_lists.length - 1].chat_list_id;
    let chatList = await this.chatListModel.findOne({ chat_list_id: chatListId });

    if (!chatList || chatList.chats.length >= CHAT.CHAT_LIMIT_IN_CHAT_LIST) {
      const lastChatList = await this.chatListModel
        .findOne()
        .sort({ chat_list_id: CHAT.CHAT_SORT_DESC })
        .exec();
      const newChatListId = lastChatList ? lastChatList.chat_list_id + 1 : 1;
      chatList = await this.chatListModel.create({
        chat_list_id: newChatListId,
        chats: [],
      });

      chatRoom.chat_lists.push(chatList);
      await chatRoom.save();
    } else {
      chatList = await this.chatListModel.findById(chatList._id).exec();

      if (!chatList) {
        throw new CustomRpcException(HttpStatus.NOT_FOUND, '채팅 리스트를 찾을 수 없습니다.');
      }
    }

    const lastChat = await this.chatModel.findOne().sort({ chat_id: CHAT.CHAT_SORT_DESC }).exec();
    const newChatId = lastChat ? lastChat.chat_id + 1 : 1;

    const newChat = await this.chatModel.create({
      chat_id: newChatId,
      sender_id: senderId,
      type: 'text',
      content: content,
    });

    if (!newChat) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '생성된 채팅이 없습니다.');
    }

    chatList.chats.push(newChat);

    await chatList.save();

    return newChat;
  }
}

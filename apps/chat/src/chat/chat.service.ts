import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { CHAT } from '@shared/constants/chat-constants';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { ChatList } from './entities/chat-list.entity';
import { ChatRoom } from './entities/chat-room.entity';
import { Chat } from './entities/chat.entity';
import { User } from './entities/user.entity';

@Injectable()
export class ChatService {
  public constructor(
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>,
    @InjectModel(ChatList.name) private chatListModel: Model<ChatList>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    if (existingChatroom) {
      const isSenderInChatRoom = existingChatroom.users.includes(senderId);
      if (isSenderInChatRoom) {
        return existingChatroom;
      } else {
        return await this.createNewChatRoom(postId, senderId, receiverId);
      }
    } else {
      return await this.createNewChatRoom(postId, senderId, receiverId);
    }
  }

  public async getChatRooms(
    userId: number,
  ): Promise<Array<{ chatRoom: ChatRoom; me: User; other: User; isRead: boolean }>> {
    const chatRooms = await this.chatRoomModel.find({ users: userId }).exec();

    if (!chatRooms || chatRooms.length === 0)
      throw new NotFoundException('해당 채널에 대한 채팅방이 없습니다.');

    const updatedChatRooms = await Promise.all(
      chatRooms.map(async (chatRoom) => {
        let me: User | null = null;
        let other: User | null = null;

        // 사용자 찾기
        await Promise.all(
          chatRoom.users.map(async (id) => {
            if (id === userId) {
              me = await this.userRepository.findOne({ where: { user_id: id } });
            } else {
              other = await this.userRepository.findOne({ where: { user_id: id } });
            }
          }),
        );

        if (!me || !other) {
          throw new Error('사용자 정보를 찾을 수 없습니다.');
        }

        const chatLists = await this.chatListModel
          .find({ chat_list_id: { $in: chatRoom.chat_lists } })
          .exec();

        const isRead = chatLists.every((chatList) => {
          if (!chatList.chats) {
            return true;
          }

          return chatList.chats.every((chat) => {
            if (chat.sender_id !== userId && chat.read_cnt === 1) {
              return false;
            }
            return true;
          });
        });

        return { chatRoom, me, other, isRead };
      }),
    );

    return updatedChatRooms;
  }

  public async getChatRoom(
    channelId: number,
    userId: number,
  ): Promise<{ chatRoom: ChatRoom; me: User; other: User }> {
    const chatRoom = await this.chatRoomModel.findOne({ channel_id: channelId }).exec();
    if (!chatRoom) throw new NotFoundException('해당 채널에 대한 채팅방이 없습니다.');

    const chatLists = await this.chatListModel.find({ chat_list_id: { $in: chatRoom.chat_lists } });
    const chatIds = chatLists.flatMap((chatList) => chatList.chats.map((chat) => chat.chat_id));

    for (const chatList of chatLists) {
      for (const chat of chatList.chats) {
        if (chat.chat_id && chat.sender_id !== userId) {
          chat.read_cnt = 0;
        }
      }

      await chatList.save();
    }

    await this.chatModel
      .updateMany(
        { chat_id: { $in: chatIds }, sender_id: { $ne: userId } },
        { $set: { read_cnt: 0 } },
      )
      .exec();

    let me: User = null;
    let other: User = null;

    await Promise.all(
      chatRoom.users.map(async (id) => {
        if (id === userId) {
          me = await this.userRepository.findOne({ where: { user_id: id } });
        } else {
          other = await this.userRepository.findOne({ where: { user_id: id } });
        }
      }),
    );

    if (!me || !other) {
      throw new Error('사용자 정보를 찾을 수 없습니다.');
    }

    return { chatRoom, me, other };
  }

  public async deleteChatRoom(channelId: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomModel.findOne({ channel_id: channelId }).exec();
    if (!chatRoom) {
      throw new NotFoundException('해당 채팅방이 없습니다.');
    }
    const chatLists = await this.chatListModel.find({ chat_list_id: { $in: chatRoom.chat_lists } });
    const chatIds = chatLists.flatMap((chatList) => chatList.chats.map((chat) => chat.chat_id));
    const chatListsIds = chatLists.map((chatList) => chatList.chat_list_id);
    await this.chatModel.deleteMany({ chat_id: { $in: chatIds } });
    await this.chatListModel.deleteMany({ chat_list_id: { $in: chatListsIds } });
    await this.chatRoomModel.findOneAndDelete({ channel_id: channelId }).exec();
    return chatRoom;
  }

  public async getChatList(channelId: number, page: number): Promise<ChatList> {
    const chatRoom = await this.chatRoomModel.findOne({ channel_id: channelId }).exec();
    if (!chatRoom) throw new NotFoundException('해당 채널에 대한 채팅방이 없습니다.');
    const [chatList] = await this.chatListModel
      .find({ _id: { $in: chatRoom.chat_lists } })
      .sort({ created_at: CHAT.SORT_DESC })
      .skip((page - 1) * CHAT.CHAT_LIST_PAGINATION_LIMIT)
      .limit(CHAT.CHAT_LIST_PAGINATION_LIMIT)
      .exec();
    if (!chatList) throw new NotFoundException('해당 채널에 대한 채팅 리스트가 없습니다.');

    return chatList;
  }

  public async saveMessage(channelId: number, content: string, senderId: number, readCnt: number) {
    const chatRoom = await this.chatRoomModel
      .findOne({ channel_id: channelId })
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
      read_cnt: readCnt,
    });

    if (!newChat) {
      throw new NotFoundException('생성된 채팅이 없습니다.');
    }

    chatRoom.last_chat = newChat.content;
    chatRoom.updated_at = new Date();

    const chatListId = chatRoom.chat_lists.at(-1);
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
      await chatRoom.save();
      await chatList.save();
    }
    return newChat;
  }

  private async getNextId(model: Model<ChatList | ChatRoom | Chat>, key: string) {
    const lastDocument = await model
      .findOne()
      .sort({ [key]: CHAT.SORT_DESC })
      .exec();
    return lastDocument ? lastDocument[key] + 1 : 1;
  }

  private async createNewChatRoom(postId: number, senderId: number, receiverId: number) {
    const chatContent = `${senderId}님이 ${receiverId}님에게 대화를 신청하였습니다.`;
    const newChannelId = await this.getNextId(this.chatRoomModel, 'channel_id');
    const newChatId = await this.getNextId(this.chatModel, 'chat_id');
    const newChatListId = await this.getNextId(this.chatListModel, 'chat_list_id');

    const newChat = await this.chatModel.create({
      chat_id: newChatId,
      sender_id: senderId,
      type: 'text',
      content: chatContent,
      read_cnt: CHAT.NOT_READ_CHAT,
    });

    const post = await this.boardRepository.findOne({ where: { post_id: postId } });
    post.chat_cnt += 1;

    await this.boardRepository.save(post);

    await this.chatListModel.create({
      chat_list_id: newChatListId,
      chats: [newChat],
    });

    const createdChatRoom = await this.chatRoomModel.create({
      channel_id: newChannelId,
      name: `${senderId}, ${receiverId}`,
      post_name: post.title,
      post_id: postId,
      last_chat: chatContent,
      users: [senderId, receiverId],
      chat_lists: [newChatListId],
    });

    return createdChatRoom;
  }
}

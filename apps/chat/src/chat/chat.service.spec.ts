import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CHAT } from '@shared/constants/chat-constants';
import mongoose, { Model } from 'mongoose';
import { ChatService } from './chat.service';
import { ChatList } from './entities/chat-list.entity';
import { ChatRoom } from './entities/chat-room.entity';

describe('ChatService', () => {
  const context = describe;
  let chatService: ChatService;
  let mockError: Error;
  let chatRoomModel: Model<ChatRoom>;
  let chatListModel: Model<ChatList>;

  const mockChatRoomModel = {
    findOne: jest.fn(),
    find: jest.fn(),
    sort: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    create: jest.fn(),
  };

  const mockChatListModel = {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  const lastChatRoom: ChatRoom = {
    channel_id: 1,
    name: 'last',
    users: [],
    chat_lists: [],
  } as ChatRoom;

  const newChatRoom: ChatRoom = {
    channel_id: 2,
    name: 'test',
    users: [],
    chat_lists: [],
  } as ChatRoom;

  const chatRooms: ChatRoom[] = [
    { channel_id: 1, name: 'room1', users: [1], chat_lists: [] } as ChatRoom,
    { channel_id: 2, name: 'room2', users: [1], chat_lists: [] } as ChatRoom,
  ];

  const chatRoom: ChatRoom = {
    channel_id: 1,
    name: 'room1',
    users: [],
    chat_lists: [],
  } as ChatRoom;

  const chatList: ChatList = {
    _id: new mongoose.Types.ObjectId().toString(),
    chat_list_id: 1,
    chats: [],
    created_at: new Date(),
    updated_at: new Date(),
  } as ChatList;

  const mockFindOneSortExec = (chatRoom: ChatRoom) => {
    mockChatRoomModel.findOne.mockReturnValueOnce({
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(chatRoom),
    });
  };

  const mockFindExec = (rooms: ChatRoom[]) => {
    mockChatRoomModel.find.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(rooms),
    });
  };

  const mockFindOneExec = (room: ChatRoom | null) => {
    mockChatRoomModel.findOne.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(room),
    });
  };

  const mockFindChatListExec = (chats: ChatList[]) => {
    mockChatListModel.exec.mockResolvedValueOnce(chats);
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getModelToken(ChatRoom.name),
          useValue: mockChatRoomModel,
        },
        {
          provide: getModelToken(ChatList.name),
          useValue: mockChatListModel,
        },
      ],
    }).compile();

    chatService = app.get<ChatService>(ChatService);
    chatRoomModel = app.get<Model<ChatRoom>>(getModelToken(ChatRoom.name));
    chatListModel = app.get<Model<ChatList>>(getModelToken(ChatList.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Chat Service, Model이 정의된다.', () => {
    expect(chatService).toBeDefined();
    expect(chatRoomModel).toBeDefined();
    expect(chatListModel).toBeDefined();
  });

  describe('chat service 테스트', () => {
    context('createChatRoom을 실행하면,', () => {
      it('success : Mogoose Model API가 호출된다.', async () => {
        mockFindOneSortExec(lastChatRoom);
        mockChatRoomModel.create.mockResolvedValue(newChatRoom);

        const result = await chatService.createChatRoom(newChatRoom.name);

        expect(result).toEqual(newChatRoom);
        expect(mockChatRoomModel.findOne).toHaveBeenCalled();
        expect(mockChatRoomModel.create).toHaveBeenCalledWith({
          channel_id: newChatRoom.channel_id,
          name: newChatRoom.name,
          users: [],
          chat_lists: [],
        });
      });
      it('error : findOne을 실행할 때 에러가 발생하게 되면 create는 실행되지 않는다. ', async () => {
        mockError = new Error(InternalServerErrorException.name);
        mockChatRoomModel.findOne.mockReturnValueOnce({
          sort: jest.fn().mockReturnValueOnce({
            exec: jest.fn().mockRejectedValueOnce(mockError),
          }),
        });
        await expect(chatService.createChatRoom(newChatRoom.name)).rejects.toThrow(mockError);

        expect(mockChatRoomModel.findOne).toHaveBeenCalled();
        expect(mockChatRoomModel.create).not.toHaveBeenCalled();
      });
      it('error : create을 실행할 때 에러가 발생하게 되면 실패하게 된다. ', async () => {
        mockError = new Error(InternalServerErrorException.name);
        mockFindOneSortExec(lastChatRoom);
        mockChatRoomModel.create.mockRejectedValue(mockError);
        await expect(chatService.createChatRoom(newChatRoom.name)).rejects.toThrow(mockError);

        expect(mockChatRoomModel.findOne).toHaveBeenCalled();
        expect(mockChatRoomModel.create).toHaveBeenCalled();
      });
    });

    context('getChatRooms를 실행하면,', () => {
      const userId = 1;

      it('success: 사용자의 채팅방 목록을 반환한다.', async () => {
        mockFindExec(chatRooms);

        const result = await chatService.getChatRooms(userId);

        expect(result).toEqual(chatRooms);
        expect(mockChatRoomModel.find).toHaveBeenCalledWith({ users: userId });
      });

      it('error : 사용자의 채팅방이 없으면 NotFoundException을 반환한다.', async () => {
        mockFindExec([]);

        await expect(chatService.getChatRooms(userId)).rejects.toThrow(NotFoundException);
        expect(mockChatRoomModel.find).toHaveBeenCalledWith({ users: userId });
      });
    });

    context('getChatRoom을 실행하면,', () => {
      const channelId = 1;

      it('success : 채널 ID에 맞는 채팅방을 반환한다.', async () => {
        mockFindOneExec(chatRoom);

        const result = await chatService.getChatRoom(channelId);

        expect(result).toEqual(chatRoom);
        expect(mockChatRoomModel.findOne).toHaveBeenCalledWith({ channel_id: channelId });
      });

      it('error : 채널 ID로 채팅방을 찾을 수 없으면 NotFoundException을 반환한다.', async () => {
        mockFindOneExec(null);

        await expect(chatService.getChatRoom(channelId)).rejects.toThrow(NotFoundException);
        expect(mockChatRoomModel.findOne).toHaveBeenCalledWith({ channel_id: channelId });
      });
    });

    context('getChatList를 실행하면,', () => {
      const channelId = 1;
      const page = 1;

      it('success : 채팅방과 채팅 리스트를 정상적으로 반환한다.', async () => {
        mockFindOneExec(chatRoom);
        mockFindChatListExec([chatList]);

        const result = await chatService.getChatList(channelId, page);

        expect(result).toEqual(chatList);
        expect(mockChatRoomModel.findOne).toHaveBeenCalledWith({ channel_id: channelId });
        expect(mockChatListModel.find).toHaveBeenCalledWith({ _id: { $in: chatRoom.chat_lists } });
        expect(mockChatListModel.sort).toHaveBeenCalledWith({
          created_at: CHAT.CHAT_LIST_SORT_DESC,
        });
        expect(mockChatListModel.skip).toHaveBeenCalledWith(
          (page - 1) * CHAT.CHAT_LIST_PAGINATION_LIMIT,
        );
        expect(mockChatListModel.limit).toHaveBeenCalledWith(CHAT.CHAT_LIST_PAGINATION_LIMIT);
      });

      it('error : 채팅방이 없으면 NotFoundException을 반환한다.', async () => {
        mockFindOneExec(null);

        await expect(chatService.getChatList(channelId, page)).rejects.toThrow(NotFoundException);
        expect(mockChatRoomModel.findOne).toHaveBeenCalledWith({ channel_id: channelId });
      });

      it('error : 채팅 리스트가 없으면 NotFoundException을 반환한다.', async () => {
        mockFindOneExec(chatRoom);
        mockFindChatListExec([]);

        await expect(chatService.getChatList(channelId, page)).rejects.toThrow(NotFoundException);
        expect(mockChatRoomModel.findOne).toHaveBeenCalledWith({ channel_id: channelId });
        expect(mockChatListModel.find).toHaveBeenCalledWith({ _id: { $in: chatRoom.chat_lists } });
      });
    });
  });
});

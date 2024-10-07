import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ChatService } from './chat.service';
import { ChatRoom } from './entity/chat-room.entity';

describe('ChatService', () => {
  const context = describe;
  let chatService: ChatService;
  let mockError: Error;
  let chatRoomModel: Model<ChatRoom>;

  const mockChatRoomModel = {
    findOne: jest.fn(),
    sort: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    create: jest.fn(),
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

  const mockFindOneSortExec = (chatRoom: ChatRoom) => {
    mockChatRoomModel.findOne.mockReturnValueOnce({
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(chatRoom),
    });
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getModelToken(ChatRoom.name),
          useValue: mockChatRoomModel,
        },
      ],
    }).compile();

    chatService = app.get<ChatService>(ChatService);
    chatRoomModel = app.get<Model<ChatRoom>>(getModelToken(ChatRoom.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
    expect(chatRoomModel).toBeDefined();
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
  });
});

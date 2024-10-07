import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRoom } from './entity/chat-room.entity';

describe('ChatController', () => {
  const context = describe;
  let chatController: ChatController;
  let chatService: ChatService;
  let mockError: Error;

  const chatRoom: ChatRoom = {
    channel_id: 1,
    name: 'test',
    users: [],
    chat_lists: [],
  } as ChatRoom;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: {
            createChatRoom: jest.fn(),
          },
        },
      ],
    }).compile();

    chatController = app.get<ChatController>(ChatController);
    chatService = app.get<ChatService>(ChatService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(chatController).toBeDefined();
    expect(chatService).toBeDefined();
  });

  describe('chat controller 테스트', () => {
    context('createChatRoom을 생성하면,', () => {
      it('success : 생성된 채팅방이 return 된다.', async () => {
        jest.spyOn(chatService, 'createChatRoom').mockResolvedValue(chatRoom);
        const result = await chatController.createChatRoom({ name: chatRoom.name });
        expect(result).toEqual(chatRoom);
        expect(chatService.createChatRoom).toHaveBeenCalledWith(chatRoom.name);
      });
      it('error : name이 undefined면 BadRequestException 에러가 발생한다.', async () => {
        mockError = new Error(BadRequestException.name);
        jest.spyOn(chatService, 'createChatRoom').mockRejectedValue(mockError);
        await expect(chatController.createChatRoom({ name: undefined })).rejects.toThrow(mockError);
        expect(chatService.createChatRoom).rejects.toThrow(mockError);
      });
    });
  });
});

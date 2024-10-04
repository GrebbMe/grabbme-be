import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

describe('ChatController', () => {
  let chatController: ChatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: {
            createChatRoom: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile();

    chatController = app.get<ChatController>(ChatController);
  });

  it('ChatController be defined', () => {
    expect(chatController).toBeDefined();
  });
});

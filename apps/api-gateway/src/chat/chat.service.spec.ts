import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: 'CHAT_SERVICE',
          useValue: jest.fn(),
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });
});

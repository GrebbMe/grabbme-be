import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let chatService: ChatService;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: 'CHAT_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
    clientProxy = module.get<ClientProxy>('CHAT_SERVICE');
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
    expect(clientProxy).toBeDefined();
  });
});

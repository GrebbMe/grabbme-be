import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@Controller('chat')
@ApiTags('Chat API')
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}
}

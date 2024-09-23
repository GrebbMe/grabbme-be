import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';

//* HTTP
@Controller()
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}
}

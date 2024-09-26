import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  public constructor(@Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy) {}
}

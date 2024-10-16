import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

//TODO: CORS 설정.
@WebSocketGateway(Number(process.env.CHAT_GATEWAY_PORT), { cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  public server: Server;

  public constructor(private readonly chatService: ChatService) {}

  public handleConnection(client: Socket) {
    //TODO: 토큰 인증 로직 처리
  }

  @SubscribeMessage('sendMessage')
  public async handleSendMessage(
    @MessageBody() messageData: { chatRoomId: string; content: string; senderId: number },
  ) {
    const chatRoomId = Number(messageData.chatRoomId);

    const savedChat = await this.chatService.saveMessage(
      chatRoomId,
      messageData.content,
      messageData.senderId,
    );

    this.server.to(messageData.chatRoomId).emit('receiveMessage', savedChat);
  }
}

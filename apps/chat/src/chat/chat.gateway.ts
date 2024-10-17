import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { CHAT } from '@shared/constants/chat-constants';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(Number(process.env.CHAT_GATEWAY_PORT), {
  cors: { origin: 'http://localhost:5173' },
})
export class ChatGateway {
  @WebSocketServer()
  public server: Server;

  public constructor(private readonly chatService: ChatService) {}

  public handleConnection(client: Socket) {
    const channelId = client.handshake.query.channelId as string;
    console.log(`Client connected: ${client.id}`);
    client.join(channelId);
  }

  public handleDisconnect(client: Socket) {
    const channelId = client.handshake.query.channelId as string;
    console.log(`Client disconnected: ${client.id}`);
    client.leave(channelId);
  }

  @SubscribeMessage('sendMessage')
  public async handleSendMessage(
    @MessageBody()
    { channelId, content, senderId }: { channelId: string; content: string; senderId: number },
  ) {
    const room = this.server.sockets.adapter.rooms.get(String(channelId));
    const readCnt = CHAT.CHAT_ROOM_LIMIT - room.size;
    const savedChat = await this.chatService.saveMessage(
      Number(channelId),
      content,
      senderId,
      readCnt,
    );

    console.log(room);

    this.server.to(channelId).emit('sendMessage', savedChat);
  }
}

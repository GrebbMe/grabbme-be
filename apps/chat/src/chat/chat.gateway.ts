import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

//* 채팅 서비스의 WebSocket 실시간 통신 처리 Gateway (포트 번호 생략. CHAT_PORT에서 WebSocket도 실행.)
//TODO: CORS 설정.
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  public server: Server;

  public handleConnection(client: Socket) {
    //TODO: 토큰 인증 로직 처리
  }

  @SubscribeMessage('message')
  public handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}

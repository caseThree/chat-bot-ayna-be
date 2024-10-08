import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';

export type AuthenticatedSocket = Socket & { username: string };

@WebSocketGateway({
  namespace: 'socket',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer()
  wss: Server;

  private count = 0;

  constructor(
    private chatService: ChatService,
    private jwtService: JwtService,
  ) {}

  public async afterInit(server: Server): Promise<void> {
  }

  public async handleConnection(
    client: AuthenticatedSocket,
    ...args: any[]
  ): Promise<void> {
    try {
      const token = client.handshake.headers.authorization;
      try {
        await this.jwtService.verify(token, {
          secret: process.env.JWT_ACCESS_TOKEN,
        });
      } catch (e) {
        if (e.name == 'TokenExpiredError') {
        } else {
          throw e;
        }
      }
      const decodedToken: any = await this.jwtService.decode(token);
      client.username = decodedToken.username;
      this.count += 1;
      console.log(`Total connected: ${this.count}`);
    } catch (e) {
      if (e.status == 400) {
        // send authorized
      } else client.send(new WsException('Unauthorized'));
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.count -= 1;
  }

  @SubscribeMessage('message')
  async message(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() messageDto: MessageDto,
  ) {
    try {
      if (!messageDto.session || messageDto.session == '') {
        messageDto.session = 'default';
      }
      await this.chatService.saveMessage(
        socket.username,
        messageDto.message,
        messageDto.session,
      );
      await this.wss.send('message', {
        username: socket.username,
        message: messageDto.message,
        session: messageDto.session,
      });
    } catch (e) {
      console.log(`Could not send message. Developer alert`);
      console.log(e)
    }
  }
}

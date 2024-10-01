import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { PassportModule } from "@nestjs/passport";
import { ChatService } from "./chat.service";
import { UserSchema } from "../user/user.schema";
import { MessageSchema } from "../user/message.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Message', schema: MessageSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: "fdsuhiojvflbfdsajkfghidofhlij3443223332[][p]2[41[4e]fd]ssadasr421",
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}

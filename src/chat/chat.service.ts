import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../user/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
  ) {}

  async saveMessage(username: string, message: string, session: string) {
    console.log(`message: ${message}`)
    console.log(`session: ${session}`)
    const msg = await this.messageModel.create({
      message,
      session,
      createdBy: username,
    });
    await msg.save();
  }
}

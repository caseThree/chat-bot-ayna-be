import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { Session } from './session.schema';
import { SessionDto } from "./dto/session.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Session') private readonly sessionModel: Model<Session>
  ) {}

  async signup(signupdto: SignupDto) {
    try {
      const user = await this.getUserByUsername(signupdto.username);
      if (user) {
        throw new BadRequestException('User already exists!');
      }
      const createdUser = await this.userModel.create({
        username: signupdto.username,
        password: signupdto.password,
      });
      const res = await createdUser.save();
      await this.createSession(signupdto.username, { session: 'default' });
      console.log(res)
    } catch (e) {
      console.log(e)
      if(e.constructor.name == BadRequestException.name) {
        throw(e)
      }
      throw new InternalServerErrorException(
        'Something went wrong! Try again.',
      );
    }
  }

  async getUserByUsername(username): Promise<User | undefined> {
    return this.userModel.findOne({
      username,
    });
  }
  async getUser({ username, password }): Promise<User | undefined> {
    return this.userModel.findOne({
      username,
      password,
    });
  }

  async createSession(username: string, sessionDto: SessionDto) {
    const sess = await this.sessionModel.create({
      name: sessionDto.session,
      createdBy: username,
    });
    await sess.save();
  }


  async getSessions(username: string) {
    return this.sessionModel.find({
      createdBy: username,
    });
  }

  async getSessionMessages(username, session) {
    return this.sessionModel.find({
      username,
      session,
    })
  }
}

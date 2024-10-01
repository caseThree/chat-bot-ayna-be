import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(logindto: LoginDto): Promise<any> {
    try {
      const user = await this.userService.getUser({
        username: logindto.username,
        password: logindto.password,
      });
      if (!user) {
        throw new BadRequestException('Username or password incorrect');
      }
      const payload = { username: user.username };

      return {
        username: logindto.username,
        access_token: this.jwtService.sign(payload),
      };
    } catch(e) {
      console.log(e)
    }

  }
}

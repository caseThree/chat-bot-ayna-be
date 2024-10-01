import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { SessionDto } from './dto/session.dto';
import JwtUserNameGuard from '../auth/guard/jwt-username.guard';
import { GetUserName } from '../auth/hooks/get-username';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  signup(@Body() signupDto: SignupDto) {
    return this.userService.signup(signupDto);
  }

  @UseGuards(JwtUserNameGuard)
  @Post('/session')
  createSession(
    @GetUserName() username: string,
    @Body() sessionDto: SessionDto,
  ) {
    return this.userService.createSession(username, sessionDto);
  }

  @UseGuards(JwtUserNameGuard)
  @Get('/session')
  getSessions(@GetUserName() username: string) {
    return this.userService.getSessions(username);
  }

  @UseGuards(JwtUserNameGuard)
  @Get('/session/:sessionId')
  getSessionMessages(
    @Param('sessionId') sessionId: string,
    @GetUserName() username: string,
  ) {
    return this.userService.getSessionMessages(username, sessionId);
  }
}

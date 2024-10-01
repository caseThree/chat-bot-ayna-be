import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from '../user/dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('/login')
    async login(@Body() logindto: LoginDto) {
        return this.authService.login(logindto)
    }

}

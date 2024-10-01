import { Length } from 'class-validator';

export class SignupDto {
  @Length(3, 20)
  username: string;
  password: string;
}

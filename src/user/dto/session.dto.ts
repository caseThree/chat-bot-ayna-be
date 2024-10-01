import { Length } from 'class-validator';

export class SessionDto {
  @Length(3, 20)
  session: string;
}

import { Length } from 'class-validator';

export class FindUserDto {
  @Length(1, 150)
  public query: string; // адрес электронной почты или имя пользователя
}

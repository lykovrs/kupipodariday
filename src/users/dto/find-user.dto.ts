import { IsEmail } from 'class-validator';

export class FindUserDto {
  @IsEmail()
  public query: string; // адрес электронной почты пользователя
}

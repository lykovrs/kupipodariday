import {
  IsEmail,
  IsStrongPassword,
  IsUrl,
  Length,
  IsOptional,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  public email: string; // адрес электронной почты пользователя
  @IsStrongPassword()
  public password: string; // пароль пользователя
  @Length(2, 30)
  public username?: string; // имя пользователя
  @IsUrl()
  @IsOptional()
  avatar: string; // ссылка на аватар
  @Length(2, 200)
  @IsOptional()
  about?: string; // информация о пользователе
}

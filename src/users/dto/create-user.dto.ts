import {
  IsEmail,
  IsStrongPassword,
  IsUrl,
  Length,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'адрес электронной почты пользователя',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'пароль пользователя',
  })
  @IsStrongPassword()
  public password: string;

  @ApiProperty({
    description: 'имя пользователя',
    minimum: 2,
    maximum: 30,
  })
  @Length(2, 30)
  public username?: string; // имя пользователя

  @ApiProperty({
    description: 'ссылка на аватар',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    description: 'информация о пользователе',
    minimum: 2,
    maximum: 200,
    required: false,
  })
  @Length(2, 200)
  @IsOptional()
  about?: string;
}

import {
  IsEmail,
  IsStrongPassword,
  IsUrl,
  Length,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  USER_DESCRIPTION_MAX_LENGTH,
  USER_DESCRIPTION_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../users.constants';

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
    minimum: USERNAME_MIN_LENGTH,
    maximum: USERNAME_MAX_LENGTH,
  })
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  public username?: string;

  @ApiProperty({
    description: 'ссылка на аватар',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    description: 'информация о пользователе',
    minimum: USER_DESCRIPTION_MIN_LENGTH,
    maximum: USER_DESCRIPTION_MAX_LENGTH,
    required: false,
  })
  @Length(USER_DESCRIPTION_MIN_LENGTH, USER_DESCRIPTION_MAX_LENGTH)
  @IsOptional()
  about?: string;
}

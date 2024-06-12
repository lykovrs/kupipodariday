import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
  @ApiProperty({
    description: 'адрес электронной почты или имя пользователя',
    minimum: 1,
    maximum: 150,
  })
  @Length(1, 150)
  public query: string;
}

import { IsEmail, IsStrongPassword } from 'class-validator';
export class SignInDto {
  @IsEmail()
  public email: string;
  @IsStrongPassword()
  public password: string;
}

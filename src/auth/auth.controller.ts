import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/error-codes';
import { ServerExceptionFilter } from '../filter/server-exception.filter';

@UseFilters(ServerExceptionFilter)
@Controller('auth')
export class AuthController {
  private users: SignUpDto[] = [];

  @Post('signup')
  public signUp(@Body() signUpDto: SignUpDto) {
    debugger;
    if (this.users.find(({ email }) => email === signUpDto.email)) {
      throw new ServerException(ErrorCode.UserAlreadyExists);
    }

    this.users.push(signUpDto);
  }

  @Post('signin')
  public signIn(@Body() signInDto: SignInDto) {
    debugger;
    const user = this.users.find(
      ({ email, password }) =>
        email === signInDto.email && password === signInDto.password,
    );

    if (!user) {
      debugger;
      throw new ServerException(ErrorCode.LoginOrPasswordIncorrect);
    }

    return user;
  }
}

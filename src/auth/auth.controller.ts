import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/error-codes';
import { ServerExceptionFilter } from '../filter/server-exception.filter';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@UseFilters(ServerExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  public async signUp(@Body() createUserDto: CreateUserDto) {
    if (await this.usersService.findByEmail(createUserDto.email)) {
      throw new ServerException(ErrorCode.UserAlreadyExists);
    }

    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  public signin(@Req() req) {
    return this.authService.auth(req.user);
  }
}

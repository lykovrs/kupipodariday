import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { ServerExceptionFilter } from '../filter/server-exception.filter';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@UseFilters(ServerExceptionFilter)
@Controller('')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  public async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  public signin(@Req() req) {
    return this.authService.auth(req.user);
  }
}

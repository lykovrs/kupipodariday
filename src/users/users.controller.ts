import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseFilters,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ServerExceptionFilter } from '../filter/server-exception.filter';
import { JwtGuard } from '../guards/auth.guard';
import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/error-codes';
import { FindUserDto } from './dto/find-user.dto';

@UseFilters(ServerExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get('/me')
  me(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = req.user;
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const me = await this.usersService.update(req.user.id, updateUserDto);

    const result = { ...req.user, ...me };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = result;

    return user;
  }

  @UseGuards(JwtGuard)
  @Get('/me/wishes')
  async getMyWishes(@Req() req) {
    const me = await this.usersService.findOneWithWishes(req.user.id);

    return me.wishes || [];
  }

  @UseGuards(JwtGuard)
  @Get(':name')
  async findOneByName(@Param('name') name: string) {
    const user = await this.usersService.findByUsername(name);

    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return user;
  }

  @UseGuards(JwtGuard)
  @Get(':name/wishes')
  async findWishesByName(@Param('name') name: string) {
    const user = await this.usersService.findWishesByUsername(name);

    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return user.wishes || [];
  }

  @UseGuards(JwtGuard)
  @Post('/find')
  async find(@Body() findUserDto: FindUserDto) {
    const user = await this.usersService.findMany(findUserDto.query);

    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return user;
  }
}

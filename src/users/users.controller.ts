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
import { FindUserDto } from './dto/find-user.dto';
import { User } from './entities/user.entity';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@UseFilters(ServerExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiExtraModels(User)
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно создан.',
    schema: { $ref: getSchemaPath(User) },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtGuard)
  @Get('/me')
  me(@Req() req) {
    return User.removePassword(req.user);
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('/me/wishes')
  async getMyWishes(@Req() req) {
    const me = await this.usersService.findOneWithWishes(req.user.id);

    return me?.wishes || [];
  }

  @UseGuards(JwtGuard)
  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.usersService.findByUsername(name);
  }

  @UseGuards(JwtGuard)
  @Get(':name/wishes')
  async findWishesByName(@Param('name') name: string) {
    const user = await this.usersService.findWishesByUsername(name);

    return user?.wishes || [];
  }

  @UseGuards(JwtGuard)
  @Post('/find')
  find(@Body() findUserDto: FindUserDto) {
    return this.usersService.findMany(findUserDto.query);
  }
}

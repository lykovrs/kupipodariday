import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../guards/auth.guard';
import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/error-codes';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user, createWishDto);
  }

  @UseGuards(JwtGuard)
  @Get('/last')
  async findLast() {
    const last = await this.wishesService.findLast();

    if (!last.length) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    return last[0];
  }

  @UseGuards(JwtGuard)
  @Get('/top')
  async findTop() {
    const last = await this.wishesService.findLast();

    if (!last.length) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    return last[0];
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wish = await this.wishesService.findOne(+id);
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    return wish;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const wish = await this.wishesService.findOne(+id);
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }

    if (wish.owner.id !== req.user.id) {
      throw new ServerException(ErrorCode.WishCanNotEdit);
    }

    return this.wishesService.update(+id, updateWishDto);
  }

  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const wish = await this.wishesService.findOne(+id);
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }

    if (wish.owner.id !== req.user.id) {
      throw new ServerException(ErrorCode.WishCanNotDelete);
    }

    await this.wishesService.remove(+id);

    return wish;
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Req() req, @Param('id') id: string) {
    const wish = await this.wishesService.findOne(+id);
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }

    const { name, image, description, link, price } = wish;

    return await this.wishesService.copy(req.user, {
      name,
      image,
      description,
      link,
      price,
    });
  }
}

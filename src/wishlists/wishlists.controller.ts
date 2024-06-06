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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../guards/auth.guard';
import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/error-codes';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(req.user, createWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wishlist = await this.wishlistsService.findOne(+id);
    if (!wishlist) {
      throw new ServerException(ErrorCode.WishlistNotFound);
    }
    return wishlist;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.wishlistsService.findOne(+id);
    if (!wishlist) {
      throw new ServerException(ErrorCode.WishlistNotFound);
    }

    if (wishlist.owner.id !== req.user.id) {
      throw new ServerException(ErrorCode.WishlistCanNotEdit);
    }

    return this.wishlistsService.update(+id, updateWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const wishlist = await this.wishlistsService.findOne(+id);
    if (!wishlist) {
      throw new ServerException(ErrorCode.WishlistNotFound);
    }

    if (wishlist.owner.id !== req.user.id) {
      throw new ServerException(ErrorCode.WishlistCanNotDelete);
    }

    await this.wishlistsService.remove(+id);

    return wishlist;
  }
}

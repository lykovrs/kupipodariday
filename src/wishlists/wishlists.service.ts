import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  create(owner: User, createWishlistDto: CreateWishlistDto) {
    const wish = this.wishlistRepository.create({
      owner: User.removePassword(owner),
      ...createWishlistDto,
    });

    return this.wishlistRepository.save(wish);
  }

  async findAll() {
    const wishlists = await this.wishlistRepository.find({
      relations: {
        owner: true,
        // items: true,
      },
    });

    wishlists.forEach((wishlist) => delete wishlist.owner.password);

    return wishlists;
  }

  async findOne(id: number) {
    const wish = await this.wishlistRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        owner: true,
        // items: true,
      },
    });

    if (wish) delete wish.owner.password;

    return wish;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistRepository.save({ id, ...updateWishlistDto });
  }

  remove(id: number) {
    return this.wishlistRepository.delete({
      id,
    });
  }
}

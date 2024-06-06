import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  async create(owner: User, createWishDto: CreateWishDto) {
    const wish = this.wishesRepository.create({
      raised: 0,
      copied: 0,
      owner: User.removePassword(owner),
      ...createWishDto,
    });

    return this.wishesRepository.save(wish);
  }

  findLast() {
    return this.wishesRepository.find({
      skip: 0,
      take: 1,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        owner: true,
      },
    });

    if (wish) delete wish.owner.password;

    return wish;
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return this.wishesRepository.save({ id, ...updateWishDto });
  }

  findAll() {
    return `This action returns all wishes`;
  }

  remove(id: number) {
    return this.wishesRepository.delete({
      id,
    });
  }

  async copy(owner: User, wish: CreateWishDto) {
    return this.create(owner, wish);
  }
}

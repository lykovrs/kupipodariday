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
      owner: owner,
      ...createWishDto,
    });

    return this.wishesRepository.save(wish);
  }

  findAll() {
    return `This action returns all wishes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wish`;
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return `This action updates a #${id} wish`;
  }

  remove(id: number) {
    return `This action removes a #${id} wish`;
  }
}

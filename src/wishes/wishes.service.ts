import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
    private dataSource: DataSource,
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
      take: 40,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findTop() {
    return this.wishesRepository.find({
      skip: 0,
      take: 20,
      order: {
        copied: 'DESC',
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

  async copy(id: number, owner: User, wish: CreateWishDto) {
    let mywish: Wish | null = null;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.wishesRepository.increment({ id }, 'copied', 1);
      mywish = await this.create(owner, wish);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return mywish;
  }
}

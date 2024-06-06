import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(
      createUserDto.password,
      this.configService.get<string>('jwt.saltOrRounds'),
    );

    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hash,
    });

    return this.usersRepository.save(user);
  }

  async findAll() {
    const users = await this.usersRepository.find();

    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: +id,
      },
    });

    return user;
  }

  async findOneWithWishes(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: +id,
      },
      relations: {
        wishes: true,
      },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hash = await bcrypt.hash(
        updateUserDto.password,
        this.configService.get<string>('jwt.saltOrRounds'),
      );

      updateUserDto.password = hash;
    }
    return this.usersRepository.save({ id, ...updateUserDto });
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  async findWishesByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
      relations: {
        wishes: true,
      },
    });

    return user;
  }

  async findMany(query: string) {
    const user = await this.usersRepository.find({
      where: [
        {
          email: Like(`%${query}%`),
        },
        {
          username: Like(`%${query}%`),
        },
      ],
      order: {
        username: 'ASC',
        email: 'ASC',
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

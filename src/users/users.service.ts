import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const userFields: Array<keyof User> = [
  'id',
  'username',
  'avatar',
  'about',
  'email',
];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);

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
      select: ['wishes'],
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.save({ id, ...updateUserDto });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
      select: userFields,
    });

    return user;
  }

  async findWishesByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
      select: ['wishes'],
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
      select: userFields,
    });

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto) {
    const offer = await this.offerRepository.create({
      ...createOfferDto,
      user,
    });
    return this.offerRepository.save(offer);
  }

  findAll() {
    return this.offerRepository.find({ relations: { user: true, item: true } });
  }

  findOne(id: number) {
    return this.offerRepository.findOne({
      where: { id },
      relations: { user: true, item: true },
    });
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.save({ id, ...updateOfferDto });
  }

  remove(id: number) {
    return this.offerRepository.delete({
      id,
    });
  }
}

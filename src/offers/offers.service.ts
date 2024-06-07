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

    await this.offerRepository.save(offer);

    return {
      ...offer,
      user: User.removePassword(offer.user),
    };
  }

  async findAll() {
    const offers = await this.offerRepository.find({
      relations: { user: true, item: true },
    });

    offers.forEach((offer) => delete offer.user.password);

    return offers;
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: { user: true, item: true },
    });

    return {
      ...offer,
      user: User.removePassword(offer.user),
    };
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

import { BaseAbstractEntity } from '../../BaseAbstractEntity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional, IsUrl, Length } from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

// Схема для подарков
@Entity()
export class Wish extends BaseAbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 250,
  })
  @Length(1, 250)
  name: string; // название подарка

  @Column()
  @IsUrl()
  @IsOptional()
  image?: string; // ссылка на изображение подарка

  @Column()
  @IsUrl()
  link: string; // ссылка на интернет-магазин, в котором можно приобрести подарок

  @Column({
    type: 'money',
  })
  price: number; // стоимость подарка

  @Column({
    type: 'money',
  })
  raised: number; // сумма предварительного сбора или сумма, которую пользователи сейчас готовы скинуть на подарок

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  @Length(1, 1024)
  description: string; // строка с описанием подарка

  @OneToMany(() => Offer, (offer) => offer.id)
  @JoinColumn()
  offers: Offer; // массив ссылок на заявки скинуться от других пользователей

  @Column({
    type: 'numeric',
    precision: 1,
  })
  copied: number; // счётчик тех, кто скопировал подарок себе
}

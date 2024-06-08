import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { BaseAbstractEntity } from '../../BaseAbstractEntity';
import {
  Length,
  IsEmail,
  IsUrl,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

// Схема пользователя
@Entity()
export class User extends BaseAbstractEntity {
  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
  })
  @Length(2, 30)
  username: string; // имя пользователя

  @Column({
    type: 'varchar',
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  @IsOptional()
  about?: string; // информация о пользователе

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  @IsOptional()
  avatar: string; // ссылка на аватар

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string; // адрес электронной почты пользователя

  @Column()
  password: string; // пароль пользователя

  @IsNotEmpty()
  @OneToMany(() => Wish, (wish) => wish.owner)
  @JoinColumn()
  wishes: Wish; // список желаемых подарков

  @OneToMany(() => Offer, (offer) => offer.user)
  @JoinColumn()
  offers: Offer; // список подарков, на которые скидывается пользователь

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  @JoinColumn()
  wishlists; // список вишлистов, которые создал пользователь

  static removePassword(userObj: User) {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key]) => key !== 'password'),
    ) as User;
  }
}

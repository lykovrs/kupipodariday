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
import { ApiProperty } from '@nestjs/swagger';
import {
  USER_DESCRIPTION_MAX_LENGTH,
  USER_DESCRIPTION_MIN_LENGTH,
  USER_DESCRIPTION_DEFAULT_TEXT,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USER_AVATAR_DEFAULT_LINK,
} from '../users.constants';

// Схема пользователя
@Entity()
export class User extends BaseAbstractEntity {
  @ApiProperty({
    description: 'имя пользователя',
    minimum: USERNAME_MIN_LENGTH,
    maximum: USERNAME_MAX_LENGTH,
  })
  @Column({
    type: 'varchar',
    length: USERNAME_MAX_LENGTH,
    unique: true,
  })
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  username: string;

  @ApiProperty({
    description: 'информация о пользователе',
    minimum: USER_DESCRIPTION_MIN_LENGTH,
    maximum: USER_DESCRIPTION_MAX_LENGTH,
    required: false,
    default: USER_DESCRIPTION_DEFAULT_TEXT,
  })
  @Column({
    type: 'varchar',
    length: USER_DESCRIPTION_MAX_LENGTH,
    default: USER_DESCRIPTION_DEFAULT_TEXT,
  })
  @Length(USER_DESCRIPTION_MIN_LENGTH, USER_DESCRIPTION_MAX_LENGTH)
  @IsOptional()
  about?: string;

  @ApiProperty({
    description: 'ссылка на аватар',
    required: false,
    default: USER_AVATAR_DEFAULT_LINK,
  })
  @Column({
    default: USER_AVATAR_DEFAULT_LINK,
  })
  @IsUrl()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    description: 'адрес электронной почты пользователя',
  })
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

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

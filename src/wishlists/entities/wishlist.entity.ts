import { Content } from '../../Content';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsUrl, Length } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';

// Cхема списка подарков
@Entity()
export class Wishlist extends Content {
  @Column({
    type: 'varchar',
    length: 250,
  })
  @Length(1, 250)
  name: string; // название подарка

  @Column({
    type: 'varchar',
    length: 1500,
  })
  @Length(1, 1500)
  description: string; // описание подборки

  @Column()
  @IsUrl()
  image: string; // обложка для подборки

  @OneToMany(() => Wish, (wish) => wish.id)
  @JoinColumn()
  items: Wish; // набор ссылок на подарки

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User; // создатель подборки
}

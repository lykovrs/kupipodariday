import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Content {
  @PrimaryGeneratedColumn()
  id: number; // уникальный числовой идентификатор
  @CreateDateColumn()
  createdAt: Date; // дата создания, тип значения Date
  @UpdateDateColumn()
  updatedAt: Date; // дата изменения, тип значения Date
}

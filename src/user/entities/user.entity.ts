import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { ListenerEntity } from 'src/listeners/entities/listener.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ListenerEntity, (listener) => listener.user)
  listeners: ListenerEntity[];

  @Column()
  name: string;

  @Column() //{unique: true}
  email: string;

  @Column()
  password: string;

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.user)
  favorites: FavoritesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

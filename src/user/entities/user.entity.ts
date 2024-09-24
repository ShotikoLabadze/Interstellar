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
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ListenerEntity, (listener) => listener.user)
  listeners: ListenerEntity[];

  @Column()
  name: string;

  //{unique: true}
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.user)
  favorites: FavoritesEntity[];

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlists: PlaylistEntity[];

  @Column({ default: false })
  blocked: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

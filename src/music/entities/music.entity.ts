import { AlbumEntity } from 'src/album/entities/album.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { ListenerEntity } from 'src/listeners/entities/listener.entity';

@Entity()
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @ManyToOne(() => AlbumEntity, (album) => album.musics)
  album: AlbumEntity[];

  @ManyToOne(() => AuthorEntity, (author) => author.musics)
  author: AuthorEntity[];

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.music)
  favorites: FavoritesEntity[];

  @OneToMany(() => ListenerEntity, (listener) => listener.music)
  listeners: ListenerEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

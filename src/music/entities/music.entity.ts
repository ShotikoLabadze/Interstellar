import { AlbumEntity } from 'src/album/entities/album.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';

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

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.musics)
  playlists: PlaylistEntity[];

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.music)
  favorites: FavoritesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

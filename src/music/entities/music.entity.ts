import { AlbumEntity } from 'src/album/entities/album.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import { ListenerEntity } from 'src/listeners/entities/listener.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Entity()
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar'})
  artistName: string;

  @ManyToOne(() => AlbumEntity, (album) => album.musics)
  albums: AlbumEntity[];

  @Column({ default: 0 })
  playCount: number;

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => AuthorEntity, (author) => author.musics)
  author: AuthorEntity[];

  @ManyToOne(() => ListenerEntity, (listener) => listener.music)
  listeners: ListenerEntity[];

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.musics)
  playlists: PlaylistEntity[];

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.music)
  favorites: FavoritesEntity[];

  @OneToMany(() => FileEntity, (file) => file.music, { cascade: true })
  @JoinColumn()
  files: FileEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

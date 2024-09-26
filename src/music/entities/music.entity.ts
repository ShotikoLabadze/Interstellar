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
  OneToOne,
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



  @Column({ type: 'varchar' })
  artistName: string;

  @ManyToMany(() => AlbumEntity, (album) => album.musics)
  albums: AlbumEntity[];

  @ManyToOne(() => AuthorEntity, (author) => author.musics)
  author: AuthorEntity[];

  @OneToMany(() => ListenerEntity, (listener) => listener.music)
    listeners: ListenerEntity[];

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.musics)
  playlists: PlaylistEntity[];

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.music)
  favorites: FavoritesEntity[];


  @OneToOne(() => FileEntity, (file) => file.music, { cascade: true })
  @JoinColumn()
  file: FileEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

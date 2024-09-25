import { AlbumEntity } from 'src/album/entities/album.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;

  @Column()
  bucket: string;

  @ManyToOne(() => MusicEntity, (music) => music.files)
  music: MusicEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.file)
  album: AlbumEntity;
  
  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.files)
  playlist: AlbumEntity;

  @ManyToOne(() => AuthorEntity, (author) => author.files)
  author: AuthorEntity;

  @Column()
  fileName: string;
}

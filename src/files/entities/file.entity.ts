import { AlbumEntity } from 'src/album/entities/album.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToOne(() => MusicEntity, (music) => music.file)
  music: MusicEntity;

  @OneToMany(() => AlbumEntity, (album) => album.file)  albums: AlbumEntity[]; 

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.files)
  playlist: PlaylistEntity; 

  @ManyToOne(() => AuthorEntity, (author) => author.files , {nullable: true})
  author: AuthorEntity;

  @Column()
  fileName: string;
}

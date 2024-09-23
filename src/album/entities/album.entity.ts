import { AuthorEntity } from 'src/author/entities/author.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { ListenerEntity } from 'src/listeners/entities/listener.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column()
  releaseDate: number;

  @Column({ type: 'varchar', length: 255 })
  albumName: string;

  @Column({ type: 'varchar', length: 255 })
  artistName: string;

  // @OneToMany(() => MusicEntity, (music) => music.album, { cascade: true })
  // musics: MusicEntity[];

  @OneToMany(() => MusicEntity, (music) => music.albums, {cascade: true})
  @JoinTable()
  musics: MusicEntity[];

  @ManyToOne(() => AuthorEntity, (author) => author.albums)
  author: AuthorEntity;

  @OneToMany(() => ListenerEntity, (listener) => listener.album)
  listeners: ListenerEntity[];

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

import { AlbumEntity } from 'src/album/entities/album.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => MusicEntity, (music) => music.author, { cascade: true })
  musics: MusicEntity[];

  @OneToMany(() => FileEntity, (file) => file.author, { cascade: true })
  @JoinColumn()
  files: FileEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.author, { cascade: true })
  albums: AlbumEntity[];

  @Column()
  biography: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

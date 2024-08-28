import { ListenerEntity } from 'src/listeners/entities/listener.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @Column({ type: 'varchar', length: 255 })
  releaseDate: string;

  @Column({ type: 'varchar', length: 255 })
  artistName: string;

  @OneToMany(() => MusicEntity, (music) => music.album, { cascade: true })
  musics: MusicEntity[];

  @OneToMany(() => ListenerEntity, (listener) => listener.album)
  listeners: ListenerEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

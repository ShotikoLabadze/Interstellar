import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { MusicEntity } from 'src/music/entities/music.entity';

@Entity()
export class ListenerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  musicId: number;

  @Column({ nullable: true })
  albumId: number;

  @ManyToOne(() => UserEntity, (user) => user.listeners)
  user: UserEntity;

  @ManyToOne(() => MusicEntity, (music) => music.listeners)
  music: MusicEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.listeners)
  album: AlbumEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

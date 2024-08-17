import { AlbumEntity } from 'src/album/entities/album.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ListenerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MusicEntity, { eager: true })
  music: MusicEntity;

  @ManyToOne(() => AlbumEntity, { eager: true })
  album: AlbumEntity;

  @Column({ type: 'varchar', length: 255 })
  listenerName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  songRequest: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

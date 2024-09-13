import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.favorites, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  musicId: number;

  @ManyToOne(() => MusicEntity, (music) => music.favorites, { eager: true })
  @JoinColumn({ name: 'musicId' })
  music: MusicEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

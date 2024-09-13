import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.favorites, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => MusicEntity, (music) => music.favorites, { eager: true })
  @JoinColumn({ name: 'musicId' })
  music: MusicEntity;
}

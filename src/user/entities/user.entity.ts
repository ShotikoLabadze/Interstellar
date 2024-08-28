import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListenerEntity } from 'src/listeners/entities/listener.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ListenerEntity, (listener) => listener.user)
  listeners: ListenerEntity[];

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

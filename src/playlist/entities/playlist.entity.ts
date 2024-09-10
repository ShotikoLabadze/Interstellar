import { MusicEntity } from "src/music/entities/music.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255})
    name: string;

    @Column({ type: 'varchar', length: 255})
    description: string;

    @ManyToMany(() => MusicEntity, (music) => music.playlists)
    @JoinTable({name:'playlist_music'})
    musics: MusicEntity[];
    
    @ManyToOne(() => UserEntity, {eager:true})
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
 
    @DeleteDateColumn()
    deletedAt: Date;
}

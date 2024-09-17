import { FileEntity } from "src/files/entities/file.entity";
import { MusicEntity } from "src/music/entities/music.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(() => FileEntity, (file) => file.playlist, { cascade: true })
    @JoinColumn()
    files: FileEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
 
    @DeleteDateColumn()
    deletedAt: Date;
}
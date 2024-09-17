import { MusicEntity } from "src/music/entities/music.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'files' })
export class FileEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    key: string;

    @Column()
    bucket: string

    @ManyToOne(() => MusicEntity, (music) => music.files )
    music: MusicEntity;

    @Column()
    fileName: string;
}
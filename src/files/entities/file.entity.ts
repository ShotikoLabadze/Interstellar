import { AlbumEntity } from "src/album/entities/album.entity";
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

    @ManyToOne(() => AlbumEntity, (album) => album.files )
    album: AlbumEntity;

    @Column()
    fileName: string;
}
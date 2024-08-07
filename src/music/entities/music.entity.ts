import { AlbumEntity } from "src/album/entities/album.entity";
import { AuthorEntity } from "src/author/entities/author.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length:255})
    name: string;

    @Column({ type: 'varchar', length:255})
    url: string;

    @ManyToOne(() => AlbumEntity, (album) => album.musics)
    album: AlbumEntity[];

    @ManyToOne(() => AuthorEntity, (author) => author.musics)
    author: AuthorEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
}

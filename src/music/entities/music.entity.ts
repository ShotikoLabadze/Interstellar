import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Music {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    url: string
}

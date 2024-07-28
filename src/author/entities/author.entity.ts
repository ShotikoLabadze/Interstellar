import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthorEntity {
    @PrimaryGeneratedColumn()
    id: number;
}

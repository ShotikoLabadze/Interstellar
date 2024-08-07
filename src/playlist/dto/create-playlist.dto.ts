import { IsString } from "class-validator"

export class CreatePlaylistDto {

    @IsString()
    name: string;
    
    @IsString()
    description: string;

    @IsString()
    userId: string;
}

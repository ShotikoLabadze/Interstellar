import { IsArray, IsNumber, IsString } from "class-validator";


export class CreateAlbumDto {
    @IsString()
    title: string;
    
    @IsString()
    releaseDate: string;

    @IsArray()
    @IsNumber({}, { each: true })
    musicIds: number[]; 

    @IsString()
    artistName: string;
}

import { Type } from "class-transformer";
import { IsArray, IsString } from "class-validator";
import { CreateMusicDto } from "src/music/dto/create-music.dto";

export class CreateAlbumDto {
    @IsString()
    title: string;
    
    @IsString()
    releaseDate: string;

    @IsArray()
    @Type(() => CreateMusicDto)
    musics:CreateMusicDto[]

    @IsString()
    artistName: string;
}

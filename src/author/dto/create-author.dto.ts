import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { CreateMusicDto } from 'src/music/dto/create-music.dto';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  biography: string;

  @IsArray()
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[];

  @IsArray()
  albums: CreateAlbumDto[];
}

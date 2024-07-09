import { Type } from 'class-transformer';
<<<<<<< HEAD
import { IsArray, IsString, ValidateNested } from 'class-validator';
=======
import { IsArray, IsString } from 'class-validator';
>>>>>>> feat/INTS-32/Implement-Search-Module
import { CreateMusicDto } from 'src/music/dto/create-music.dto';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsArray()
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[];

  @IsString()
  biography: string;
}

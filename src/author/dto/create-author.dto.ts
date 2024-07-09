import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
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

import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  biography: string;

  // @IsArray()
  // @Type(() => CreateMusicDto)
  // musics: CreateMusicDto[];

  // @IsArray()
  // albums: CreateAlbumDto[];
}

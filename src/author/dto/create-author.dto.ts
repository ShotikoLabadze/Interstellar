import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

<<<<<<< Updated upstream
  // need music resource
=======
  @IsArray()
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[];
>>>>>>> Stashed changes

  @IsString()
  biography: string;
}

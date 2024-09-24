import { IsNumber, IsNumberString, IsString, IsUrl } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsString()
  artistName: string;

  @IsNumberString()
  albumId: number;
}

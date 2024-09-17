import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  title: string;

  @IsString()
  releaseDate: string;

  @IsArray()
  @IsNumberString({}, { each: true })
  musicIds: number[];

  @IsString()
  artistName: string;
}

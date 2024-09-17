import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  releaseDate: string;

//   @IsArray()
//   @IsNumberString({}, { each: true })
//   musicIds: number[];

  @IsString()
  albumName: string;
}

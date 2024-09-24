import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10)) 
  releaseDate: number;

  @IsNumberString()
  authorId: number;

  @IsString()
  albumName: string;

}

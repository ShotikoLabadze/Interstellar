import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10)) 
  releaseDate: number;

//   @IsArray()
//   @IsNumberString({}, { each: true })
//   musicIds: number[];

  @IsString()
  albumName: string;

}

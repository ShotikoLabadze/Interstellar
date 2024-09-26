import { Transform, Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsString, IsUrl } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;



  @Type(() => Number)
  @IsNumber()
  albumId: number;
}

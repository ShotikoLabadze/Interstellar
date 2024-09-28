import { Transform, Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsOptional() // Optional if you want to calculate duration automatically
  @IsNumber()
  duration?: number;

  @IsString()
  albumName:string

  @IsString()
  artistName:string

  @Type(() => Number)
  @IsNumber()
  albumId: number;

  @IsOptional() 
  @IsString()
  @IsUrl() 
  albumCover?: string;
}

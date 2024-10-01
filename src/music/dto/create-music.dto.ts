import { Transform, Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsString()
  albumName:string

  @IsString()
  artistName:string

  @Type(() => Number)
  @IsNumber()
  albumId: number;

  @Type(() => Number)
  @IsNumber()
  authorId: number;

  @IsOptional() 
  @IsString()
  albumCover?: string;
}

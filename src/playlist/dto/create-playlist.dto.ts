import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  name: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  musicIds: number[];
}

import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  musicIds: number[];
}

import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateListenerDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  musicId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  albumId?: number;
}

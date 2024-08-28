import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateListenerDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  musicId: number;

  @IsNotEmpty()
  @IsNumber()
  albumId: number;
}

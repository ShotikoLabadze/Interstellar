import { IsNotEmpty } from 'class-validator';

export class CreateFavoritesDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  musicId: number;
}

import { IsInt, IsNotEmpty, isNotEmpty, IsNumber } from 'class-validator';

export class CreateListenerDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;
}

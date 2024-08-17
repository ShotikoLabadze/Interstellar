import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateListenerDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  listenerName: string;
}

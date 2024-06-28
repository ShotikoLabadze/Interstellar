import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  // need music resource

  @IsString()
  readonly biography: string;
}

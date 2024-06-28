import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  // need music resource

  @IsString()
  biography: string;
}

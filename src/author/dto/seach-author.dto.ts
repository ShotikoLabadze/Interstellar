import { IsNotEmpty, IsString, isString } from 'class-validator';

export class GetAuthorSearchDto {
  @IsString()
  @IsNotEmpty()
  search: string;
}

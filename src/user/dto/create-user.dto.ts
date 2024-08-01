import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password must be at least 8 chattacters long' })
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Password must contain one number and one symbol',
  })
  password: string;
}

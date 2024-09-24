import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password must be at least 8 chattacters long' })
  @IsStrongPassword()
  password: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  playlists: PlaylistEntity[];

  @IsOptional()
  @IsBoolean()
  blocked?: boolean;


  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}

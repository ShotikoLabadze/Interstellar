import {
  ArrayNotEmpty,
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
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
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

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  ids?: number[];
}

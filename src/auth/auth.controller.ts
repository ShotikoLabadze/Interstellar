import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post() 
  async login(@Body() createAuthDto: CreateAuthDto) {
    try {
      return await this.authService.login(createAuthDto.email, createAuthDto.password);
    } catch (error) {
      throw new UnauthorizedException(error.message); 
    }
  }
}

import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

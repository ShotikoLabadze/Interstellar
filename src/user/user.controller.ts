import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req) {
    console.log(req.user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  //block endpoints
  @Patch('block')
  async blockUsers(@Body() body: { ids: number[] }) {
    const { ids } = body;
    return this.userService.blockUsers(ids);
  }

  @Patch('unblock')
  async unblockUsers(@Body() body: { ids: number[] }) {
    const { ids } = body;
    return this.userService.unblockUsers(ids);
  }

  @Delete('delete')
  async deleteUsers(@Body() body: { ids: number[] }) {
    const { ids } = body;
    return this.userService.deleteUsers(ids);
  }
}

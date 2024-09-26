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
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  //get me
  @UseGuards(AuthGuard)
  @Get('me')
  async getCurrentUser(@Req() req) {
    return this.userService.getCurrentUser(Number(req.user.userId));
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll(@Req() req) {
    return this.userService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  //block endpoints
  @UseGuards(AdminGuard)
  @Patch('block')
  async blockUsers(@Body() body: { ids: number[] }) {
    const { ids } = body;
    return this.userService.blockUsers(ids);
  }

  @UseGuards(AdminGuard)
  @Patch('unblock')
  async unblockUsers(@Body() body: { ids: number[] }) {
    const { ids } = body;
    return this.userService.unblockUsers(ids);
  }

  @UseGuards(AdminGuard)
  @Delete('delete')
  async deleteUsers(@Body() body: { ids: number[] }) {
    const { ids } = body;
    return this.userService.deleteUsers(ids);
  }

  //block unblock single endpoints
  @Patch('block/:id')
  async blockUser(@Param('id') id: string) {
    return this.userService.blockUser(+id);
  }

  @Patch('unblock/:id')
  async unblockUser(@Param('id') id: string) {
    return this.userService.unblockUser(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

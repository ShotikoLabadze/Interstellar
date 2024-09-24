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

  //get me
  @Get('me/:id')
  async getCurrentUser(@Param('id') userId: string) {
    return this.userService.getCurrentUser(Number(userId));
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  //block endpoints
  @Patch('block/:id')
  async blockUsers(@Param('id') id: string) {
    const idArray = id.split(',').map(Number);
    return this.userService.blockUsers(idArray);
  }

  @Patch('unblock/:id')
  async unblockUsers(@Param('id') id: string) {
    const idArray = id.split(',').map(Number);
    return this.userService.unblockUsers(idArray);
  }

  @Delete('delete/:id')
  async deleteUsers(@Param('id') id: string) {
    const idArray = id.split(',').map(Number);
    return this.userService.deleteUsers(idArray);
  }
}

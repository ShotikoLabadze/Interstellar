import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { GetAuthorSearchDto } from './dto/seach-author.dto';
import { AuthorEntity } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): AuthorEntity {
    return this.authorService.create(createAuthorDto);
  }
  //search logic
  @Get('search')
  search(@Query() getAuthorSearchDto: GetAuthorSearchDto): AuthorEntity[] {
    return this.authorService.search(getAuthorSearchDto);
  }

  @Get()
  findAll(): AuthorEntity[] {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): AuthorEntity {
    return this.authorService.findOne(+id); // Ensure +id parses string to number
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): AuthorEntity {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.authorService.remove(+id);
  }
}

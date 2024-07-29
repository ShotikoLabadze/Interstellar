import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async findAllSearch(@Query('search') search: string) {
    return await this.searchService.findAllSearch(search);
  }
}

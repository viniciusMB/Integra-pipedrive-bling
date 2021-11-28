import { Controller, Get, Param } from '@nestjs/common';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  findAll() {
    return this.dealsService.findAll();
  }

  @Get(':wonDay')
  findByDate(@Param('wonDay') wonDay: string) {
    return this.dealsService.findByDate(wonDay);
  }
}

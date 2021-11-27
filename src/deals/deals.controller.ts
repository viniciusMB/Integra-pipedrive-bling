import { Controller, Get, Param, Delete } from '@nestjs/common';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  findAll() {
    return this.dealsService.findAll();
  }

  @Get(':id')
  findByDate(@Param('wonDay') wonDay: string) {
    return this.dealsService.findByDate(wonDay);
  }

  /*@Delete(':wonDay')                        Se der tempo :) fazer proteção com jwt etc..
  remove(@Param('wonDay') wonDay: string) {
    return this.dealsService.remove(wonDay);
  }
  */
}

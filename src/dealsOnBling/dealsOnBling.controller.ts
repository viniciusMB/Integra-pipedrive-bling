import { Controller, Get, Param } from '@nestjs/common';
import { DealsOnBlingService } from './dealsOnbling.service';

@Controller('dealsOnBling')
export class DealsOnBlingController {
  constructor(private readonly dealsOnBlingService: DealsOnBlingService) {}

  @Get()
  findAll() {
    return this.dealsOnBlingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dealsOnBlingService.findByID(id);
  }

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealsOnBlingService.remove(id);
  }
  */
}

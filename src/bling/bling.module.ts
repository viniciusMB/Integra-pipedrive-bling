import { Module } from '@nestjs/common';
import { BlingController } from './bling.controller';
import { BlingService } from './bling.service';

@Module({
  controllers: [],
  providers: [BlingService],
  exports: [BlingService, BlingController],
})
export class BlingModule {}

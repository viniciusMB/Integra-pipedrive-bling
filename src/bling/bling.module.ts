import { Module } from '@nestjs/common';
import { BlingController } from './bling.controller';
import { BlingService } from './bling.service';

import { DealsOnBlingService } from 'src/dealsOnBling/dealsOnbling.service';
import { DealOnBlingSchema } from '../dealsOnBling/schemas/dealOnBling.schema';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DealOnBling', schema: DealOnBlingSchema },
    ]),
  ],
  controllers: [],
  providers: [BlingService, BlingController, DealsOnBlingService],
  exports: [BlingService, BlingController],
})
export class BlingModule {}

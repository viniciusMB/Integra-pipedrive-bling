import { Module } from '@nestjs/common';
import { BlingDto } from './bling.dto';
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
  providers: [BlingService, BlingDto, DealsOnBlingService],
  exports: [BlingService, BlingDto],
})
export class BlingModule {}

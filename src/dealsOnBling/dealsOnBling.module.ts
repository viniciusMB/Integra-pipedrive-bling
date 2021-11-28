import { Module } from '@nestjs/common';
import { DealsOnBlingService } from './dealsOnbling.service';
import { DealsOnBlingController } from './dealsOnBling.controller';
import { DealOnBlingSchema } from './schemas/dealOnBling.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { isNotPostedOnBling } from './isNotPostedOnBling';
import { DealsService } from 'src/deals/deals.service';
import { BlingService } from 'src/bling/bling.service';
import { BlingController } from 'src/bling/bling.controller';
import { DealSchema } from 'src/deals/schemas/deal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DealOnBling', schema: DealOnBlingSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Deal', schema: DealSchema }]),
  ],
  controllers: [DealsOnBlingController],
  providers: [
    DealsOnBlingService,
    isNotPostedOnBling,
    BlingController,
    DealsService,
    BlingService,
  ],
  exports: [DealsOnBlingService, isNotPostedOnBling],
})
export class DealsOnBlingModule {}

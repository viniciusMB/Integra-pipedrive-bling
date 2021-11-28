import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DealsService } from 'src/deals/deals.service';
import { CreateDealDto } from 'src/deals/dto/create-deal.dto';
import { UpdateDealDto } from 'src/deals/dto/update-deal.dto';
import { PipeDriveService } from 'src/pipeDrive/pipeDrive.service';

import { dealReceived } from './interfaces/dealReceived.interface';
@Injectable()
export class CronService {
  constructor(
    @Inject(forwardRef(() => PipeDriveService))
    private readonly pipeDriveService: PipeDriveService,

    @Inject(forwardRef(() => DealsService))
    private readonly dealService: DealsService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async runEveryDay() {
    console.log('Checking for deals...');
    const deals = await this.pipeDriveService.getDeals();
    const dealCollection = {} as dealReceived;
    console.log(dealCollection.wonDay);

    deals.map(async (deal) => {
      const wonDay: string = deal.won_time.split(' ')[0];

      if (wonDay != dealCollection.wonDay) {
        const response = await this.dealService.findByDate(wonDay);

        if (response == null) {
          if (dealCollection.wonDay != undefined) {
            const createDealDto: CreateDealDto = dealCollection;

            await this.dealService.create(createDealDto);

            dealCollection.wonDay = wonDay;
            dealCollection.totalValue = deal.value;
          } else {
            const createDealDto: CreateDealDto = {
              wonDay: wonDay,
              totalValue: deal.value,
            };

            await this.dealService.create(createDealDto);
          }
        } else {
          dealCollection.wonDay = wonDay;
          dealCollection.totalValue = response.totalValue + deal.value;

          const updateDealDto: UpdateDealDto = dealCollection;

          this.dealService.updateTotalValue(updateDealDto);
        }
      }
    });
  }
}

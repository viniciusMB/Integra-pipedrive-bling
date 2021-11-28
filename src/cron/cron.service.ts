import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { delay } from 'rxjs';
import { BlingController } from 'src/bling/bling.controller';
import { BlingService } from 'src/bling/bling.service';
import { IPostDeal } from 'src/bling/interfaces/IpostDeal';
import { DealsService } from 'src/deals/deals.service';
import { CreateDealDto } from 'src/deals/dto/create-deal.dto';
import { UpdateDealDto } from 'src/deals/dto/update-deal.dto';
import { PipeDriveService } from 'src/pipeDrive/pipeDrive.service';

@Injectable()
export class CronService {
  constructor(
    @Inject(forwardRef(() => PipeDriveService))
    private readonly pipeDriveService: PipeDriveService,

    @Inject(forwardRef(() => DealsService))
    private readonly dealService: DealsService,

    @Inject(forwardRef(() => BlingService))
    private readonly blingService: BlingService,

    @Inject(forwardRef(() => BlingController))
    private readonly blingController: BlingController,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async runEveryDay() {
    console.log('Checking for deals...');
    const deals = await this.pipeDriveService.getDeals();

    deals.map(async (deal) => {
      const wonDay: string = deal.won_time.split(' ')[0];

      const response = await this.dealService.findByDate(wonDay);
      const postDealDto: IPostDeal = {
        pedido: {
          numero: deal.id,
          cliente: {
            id: deal.user_id.id,
            nome: deal.user_id.name,
            email: deal.user_id.email,
          },
          volumes: {
            volume: {
              servico: 'Mandou chegou',
            },
          },
          parcela: {
            vlr: deal.value,
          },
          item: {
            qtde: 1,
            vlr_unit: deal.value,
            codigo: 2,
            descricao: 'produto postado por vinicius :)',
            un: '1',
          },
        },
      };

      if (response == null) {
        try {
          const createDealDto: CreateDealDto = {
            totalValue: deal.value,
            wonDay: wonDay,
          };

          const dealCreated = await this.dealService.create(createDealDto);
          console.log(dealCreated);
        } catch (error) {
          console.log(error);
        }
      } else {
        const updateDealDto: UpdateDealDto = {
          totalValue: response.totalValue + deal.value,
          wonDay: wonDay,
        };

        console.log(await this.dealService.updateTotalValue(updateDealDto));
      }

      /*if (wonDay != dealCollection.wonDay) {
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
      }*/
    });
  }
}

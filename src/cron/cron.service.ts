import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { BlingService } from 'src/bling/bling.service';

import { isNotPostedOnBling } from 'src/dealsOnBling/isNotPostedOnBling';
import { PipeDriveService } from 'src/pipeDrive/pipeDrive.service';

@Injectable()
export class CronService {
  constructor(
    @Inject(forwardRef(() => PipeDriveService))
    private readonly pipeDriveService: PipeDriveService,

    @Inject(forwardRef(() => BlingService))
    private readonly blingService: BlingService,

    @Inject(forwardRef(() => isNotPostedOnBling))
    private readonly isNotPostedOnBling: isNotPostedOnBling,
  ) {}

  // Para testar o código altere a função do cron. Recomendo o .EVERY_MINUTE ou .EVERY_5_MINUTES, dependendo da quantidade de deals no pipedrive.
  @Cron(CronExpression.EVERY_MINUTE) // Idealmente, essa rotina rodaria 1 vez ao dia
  async runEveryDay() {
    console.log('Checking for deals...');

    // Pega todos os deals com status won
    const deals = await this.pipeDriveService.getDeals();

    // Para cada deal, posta no bling, no banco e atualiza o status do deal baseado no dia
    for (const deal of deals) {
      const wonDay: string = deal.won_time.split(' ')[0];

      // Se o deal não houver sido postado no bling, retorna null
      const isPostedOnBling = await this.blingService.getDealByID(deal.id);

      if (!isPostedOnBling) {
        const result = await this.isNotPostedOnBling.execute(wonDay, deal);
        console.log(result);
        return result;
      }
      console.log(
        `Deal already posted on Bling \n Deal: \n ${isPostedOnBling.pedido.numero}`,
      );
    }
  }
}

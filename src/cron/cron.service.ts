import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PipeDriveService } from 'src/pipeDrive/pipeDrive.service';

@Injectable()
export class CronService {
  constructor(
    @Inject(forwardRef(() => PipeDriveService))
    private readonly pipeDriveService: PipeDriveService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async runEveryDay() {
    console.log('Checking for deals...');
    const deals = await this.pipeDriveService.getDeals();
  }
}

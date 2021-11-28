import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CronService } from './cron/cron.service';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

import { DealsModule } from './deals/deals.module';
import { PipeDriveModule } from './pipeDrive/pipeDrive.module';

import { PipeDriveService } from './pipeDrive/pipeDrive.service';
import { DealsService } from './deals/deals.service';
import { BlingModule } from './bling/bling.module';
import { DealsOnBlingModule } from './dealsOnBling/dealsOnBling.module';

@Module({
  imports: [
    PipeDriveModule,
    DealsModule,
    DealsOnBlingModule,
    BlingModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_KEY),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CronService,
    PipeDriveModule,
    BlingModule,
    DealsOnBlingModule,
    DealsModule,
  ],
})
export class AppModule {}

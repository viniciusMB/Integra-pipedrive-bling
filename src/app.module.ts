import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { DealsModule } from './deals/deals.module';
import { PipeDriveModule } from './pipeDrive/pipeDrive.module';
import { CronService } from 'cron/cron.service';
import { PipeDriveService } from './pipeDrive/pipeDrive.service';

@Module({
  imports: [
    PipeDriveModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://viniciusMB:58274169@integraapi.5dhn5.mongodb.net/integraAPI?retryWrites=true&w=majority',
    ),
    DealsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronService, PipeDriveService],
})
export class AppModule {}

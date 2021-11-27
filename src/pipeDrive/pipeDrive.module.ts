import { Module } from '@nestjs/common';
import { PipeDriveService } from './pipeDrive.service';

@Module({
  controllers: [],
  providers: [PipeDriveService],
})
export class PipeDriveModule {}

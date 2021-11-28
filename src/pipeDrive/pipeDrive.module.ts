import { Module } from '@nestjs/common';
import { PipeDriveService } from './pipeDrive.service';

@Module({
  controllers: [],
  providers: [PipeDriveService],
  exports: [PipeDriveService],
})
export class PipeDriveModule {}

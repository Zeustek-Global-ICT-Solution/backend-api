import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';

@Module({
  providers: [SharedService],
  exports: [SharedService],
  imports: [CoreModule, DatabaseModule],
})
export class SharedModule {}

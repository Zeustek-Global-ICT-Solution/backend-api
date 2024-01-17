import { Global, Module } from '@nestjs/common';
import { AzureCommunicationProviders } from './porviders/communication.provider';
import { CommunicationService } from './services/communication.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [CommunicationService, ...AzureCommunicationProviders],
  exports: [CommunicationService, ...AzureCommunicationProviders],
})
export class CommunicationModule {}

import { Global, Module } from '@nestjs/common';
import { AzureCommunicationProviders } from './porviders/communication.provider';
import { CommunicationService } from './services/communication.service';

@Global()
@Module({
  providers: [CommunicationService, ...AzureCommunicationProviders],
  exports: [CommunicationService, ...AzureCommunicationProviders],
})
export class CommunicationModule {}

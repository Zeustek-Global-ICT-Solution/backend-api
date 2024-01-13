import { Global, Module } from '@nestjs/common';
import { AzureCommunicationProviders } from './communication.provider';
import { CommunicationService } from './communication.service';

@Global()
@Module({
  providers: [CommunicationService, ...AzureCommunicationProviders],
  exports: [CommunicationService, ...AzureCommunicationProviders],
})
export class CommunicationModule {}

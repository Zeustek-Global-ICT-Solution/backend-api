import { ConfigService } from '@nestjs/config';
import { EMAIL_TOKEN, SMS_TOKEN } from '../../constant';
import { SmsClient } from '@azure/communication-sms';
import { EmailClient } from '@azure/communication-email';

export const AzureCommunicationProviders = [
  {
    provide: SMS_TOKEN,
    useFactory: async (config: ConfigService) => {
      // Instantiate the SMS client. COMMUNICATION_SERVICES_CONNECTION_STRING
      const smsClient = new SmsClient(
        config.get<string>('service.azure.communicationConnectionString'),
      );
      return smsClient;
    },
    inject: [ConfigService],
  },
  {
    provide: EMAIL_TOKEN,
    useFactory: async (config: ConfigService) => {
      // Instantiate the SMS client. COMMUNICATION_SERVICES_CONNECTION_STRING
      const smsClient = new EmailClient(
        config.get<string>('service.azure.communicationConnectionString'),
      );
      return smsClient;
    },
    inject: [ConfigService],
  },
];

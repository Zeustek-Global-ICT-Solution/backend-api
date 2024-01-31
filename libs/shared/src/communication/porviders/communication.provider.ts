/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigService } from '@nestjs/config';
import { EMAIL_TOKEN, SMS_TOKEN, NBS_SMS_TOKEN } from '../../constant';
import { SmsClient } from '@azure/communication-sms';
import { EmailClient } from '@azure/communication-email';
import { NBSMS } from 'nigeria-bulk-sms';

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
  {
    provide: NBS_SMS_TOKEN,
    useFactory: async (config: ConfigService) => {
      const NBSMSClient = new NBSMS({
        username: config.get<string>('service.nbsms.username'),
        password: config.get<string>('service.nbsms.password'),
        senderPhoneNumber: config.get<string>('service.nbsms.sender'),
      });
      return NBSMSClient;
    },
    inject: [ConfigService],
  },
];

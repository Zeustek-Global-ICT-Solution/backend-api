import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_TOKEN, SMS_TOKEN } from '../../constant';
import { EmailClient } from '@azure/communication-email';
import { SmsClient } from '@azure/communication-sms';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommunicationService {
  constructor(
    @Inject(EMAIL_TOKEN) private readonly emailClient: EmailClient,
    @Inject(SMS_TOKEN) private readonly smsClient: SmsClient,
    protected config: ConfigService,
  ) {}
  public async sendEmail(payload: any) {
    try {
      console.log(
        payload,
        this.config.get<string>('service.azure.emailDomain'),
      );

      const emailMessage = {
        senderAddress: this.config.get<string>('service.azure.emailDomain'),
        content: {
          subject: payload.subject,
          plainText: payload.body,
        },
        recipients: {
          to: payload.emails, //[{ address: payload.email }],
        },
      };

      const poller = await this.emailClient.beginSend(emailMessage);
      return await poller.pollUntilDone();
    } catch (error) {
      console.error(error.message);
    }
  }

  public async sendSMS(payload: any) {
    try {
      return await this.smsClient.send({
        from: this.config.get<string>('service.azure.phone'), // Your E.164 formatted phone number used to send SMS
        to: payload.phones, // The list of E.164 formatted phone numbers to which message is being sent
        message: payload.message, // The message being sent
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}

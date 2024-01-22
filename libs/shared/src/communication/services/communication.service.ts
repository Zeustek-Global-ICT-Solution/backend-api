import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_TOKEN, SMS_TOKEN } from '../../constant';
import { EmailClient } from '@azure/communication-email';
import { SmsClient } from '@azure/communication-sms';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { AppException } from '@app/shared/exceptions';

@Injectable()
export class CommunicationService {
  constructor(
    @Inject(EMAIL_TOKEN) private readonly emailClient: EmailClient,
    @Inject(SMS_TOKEN) private readonly smsClient: SmsClient,
    private readonly httpService: HttpService,
    protected config: ConfigService,
  ) {}
  public async sendEmail(payload: any) {
    try {
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
      throw new AppException(400, error);
    }
  }

  public async sendAzureSMS(payload: any) {
    try {
      return await this.smsClient.send({
        from: this.config.get<string>('service.azure.phone'), // Your E.164 formatted phone number used to send SMS
        to: payload.phones, // The list of E.164 formatted phone numbers to which message is being sent
        message: payload.message, // The message being sent
      });
    } catch (error) {
      throw new AppException(400, error);
    }
  }

  public async sendNBSSMS(payload: any) {
    try {
      const url = `https://portal.nigeriabulksms.com/api/?username=${this.config.get<string>('service.nbsms.username')}&password=${this.config.get<string>('service.nbsms.password')}&message=${payload.message}&sender=${this.config.get<string>('service.nbsms.sender')}&mobiles=${payload.phones.map((x) => x.phone)[0]}`;
      const { data } = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error: AxiosError) => {
            throw new AppException(error.response.status, error.response.data);
          }),
        ),
      );
      return data;
    } catch (error) {
      throw new AppException(400, error);
    }
  }
}

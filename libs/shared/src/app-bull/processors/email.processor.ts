import { CommunicationService } from '@app/shared/communication/services/communication.service';
import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bullmq';

@Processor('message_queue') // Replace with your queue name
export class MessageProcessor {
  constructor(
    protected communicationService: CommunicationService,
    protected config: ConfigService,
  ) {}

  @Process('send_email')
  async sendEmail(job: Job): Promise<void> {
    const emailData = job.data;
    try {
      await this.communicationService.sendEmail(emailData);
    } catch (error) {
      // Handle error or retry logic
      console.error('Error sending email:', error);
      throw error;
    }
  }

  @Process('send_sms')
  async sendSMS(job: Job): Promise<void> {
    const smsData = job.data;
    try {
      await this.communicationService.sendNBSSMS(smsData);
    } catch (error) {
      // Handle error or retry logic
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job) {
    console.log(`Job ${job.id} completed successfully.`);
  }

  @OnQueueFailed()
  onQueueFailed(job: Job, error: Error) {
    console.error(`Job ${job.id} failed with error: ${error.message}`);
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateWhatsappAssistantDto } from '../dto/create-whatsapp-assistant.dto';
import { UpdateWhatsappAssistantDto } from '../dto/update-whatsapp-assistant.dto';

@Injectable()
export class WhatsappAssistantsService {
  create(createWhatsappAssistantDto: CreateWhatsappAssistantDto) {
    return 'This action adds a new whatsappAssistant';
  }

  findAll() {
    return `This action returns all whatsappAssistants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whatsappAssistant`;
  }

  update(id: number, updateWhatsappAssistantDto: UpdateWhatsappAssistantDto) {
    return `This action updates a #${id} whatsappAssistant`;
  }

  remove(id: number) {
    return `This action removes a #${id} whatsappAssistant`;
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateWhatsappAssistantDto } from './create-whatsapp-assistant.dto';

export class UpdateWhatsappAssistantDto extends PartialType(CreateWhatsappAssistantDto) {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WhatsappAssistantsService } from '../services/whatsapp-assistants.service';
import { CreateWhatsappAssistantDto } from '../dto/create-whatsapp-assistant.dto';
import { UpdateWhatsappAssistantDto } from '../dto/update-whatsapp-assistant.dto';

@Controller('whatsapp-assistants')
export class WhatsappAssistantsController {
  constructor(
    private readonly whatsappAssistantsService: WhatsappAssistantsService,
  ) {}

  @Post()
  create(@Body() createWhatsappAssistantDto: CreateWhatsappAssistantDto) {
    return this.whatsappAssistantsService.create(createWhatsappAssistantDto);
  }

  @Get()
  findAll() {
    return this.whatsappAssistantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatsappAssistantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWhatsappAssistantDto: UpdateWhatsappAssistantDto,
  ) {
    return this.whatsappAssistantsService.update(
      +id,
      updateWhatsappAssistantDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsappAssistantsService.remove(+id);
  }
}

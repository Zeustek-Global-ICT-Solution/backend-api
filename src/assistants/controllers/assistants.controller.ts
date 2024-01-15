import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssistantsService } from '../services/ssistants.service';
import { CreateWhatsappAssistantDto } from '../dto/create-whatsapp-assistant.dto';
import { UpdateWhatsappAssistantDto } from '../dto/update-whatsapp-assistant.dto';

@Controller('assistants')
export class AssistantsController {
  constructor(private readonly whatsappAssistantsService: AssistantsService) {}

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

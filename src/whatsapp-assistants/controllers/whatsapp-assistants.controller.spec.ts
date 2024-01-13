import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappAssistantsController } from './whatsapp-assistants.controller';
import { WhatsappAssistantsService } from '../services/whatsapp-assistants.service';

describe('WhatsappAssistantsController', () => {
  let controller: WhatsappAssistantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhatsappAssistantsController],
      providers: [WhatsappAssistantsService],
    }).compile();

    controller = module.get<WhatsappAssistantsController>(
      WhatsappAssistantsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappAssistantsService } from './whatsapp-assistants.service';

describe('WhatsappAssistantsService', () => {
  let service: WhatsappAssistantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhatsappAssistantsService],
    }).compile();

    service = module.get<WhatsappAssistantsService>(WhatsappAssistantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

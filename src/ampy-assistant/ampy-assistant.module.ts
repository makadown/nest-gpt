import { Module } from '@nestjs/common';
import { AmpyAssistantService } from './ampy-assistant.service';
import { AmpyAssistantController } from './ampy-assistant.controller';

@Module({
  controllers: [AmpyAssistantController],
  providers: [AmpyAssistantService],
})
export class AmpyAssistantModule {}

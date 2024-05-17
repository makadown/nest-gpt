import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { AmpyAssistantModule } from './ampy-assistant/ampy-assistant.module';

@Module({
  imports: [ConfigModule.forRoot(), GptModule, AmpyAssistantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

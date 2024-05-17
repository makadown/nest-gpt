import { Body, Controller, Post } from '@nestjs/common';
import { AmpyAssistantService } from './ampy-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('ampy-assistant')
export class AmpyAssistantController {
  constructor(private readonly ampyAssistantService: AmpyAssistantService) {}

  @Post('create-thread')
  async createThread() {
    return await this.ampyAssistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(
    @Body() questionDto: QuestionDto
  ) {
    return await this.ampyAssistantService.userQuestion(questionDto);
  }
}

import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { createMessageUseCase, createThreadUseCase, createRunUseCase, checkCompleteStatusUseCase } from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class AmpyAssistantService {
    private openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

    async createThread () {
        return await createThreadUseCase(this.openai);
    }

    async userQuestion(questionDto: QuestionDto) {
        const message = await createMessageUseCase(this.openai, { threadId: questionDto.threadId, question: questionDto.question });
        const run = await createRunUseCase(this.openai, { threadId: questionDto.threadId });
        const runStatus = await checkCompleteStatusUseCase(this.openai, { threadId: questionDto.threadId, runId: run.id });
        return runStatus;
    }

}

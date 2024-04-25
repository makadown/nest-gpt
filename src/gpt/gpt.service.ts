import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';

/**
 * This service os going to call only Use Cases
 */
@Injectable()
export class GptService {
  private openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

  constructor() {}

  async ortographyCheck(orthographyDto: OrthographyDto) {
    return await ortographyCheckUseCase( this.openai, { prompt: orthographyDto.prompt });
  }
}

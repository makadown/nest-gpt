import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase, proConsDiscusserStreamUseCase, proConsDiscusserUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
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

  async prosConsDiscusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await proConsDiscusserUseCase( this.openai, { prompt: prosConsDiscusserDto.prompt });
  }
  
  async prosConsDiscusserStream(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await proConsDiscusserStreamUseCase( this.openai, { prompt: prosConsDiscusserDto.prompt });
  }

  async translate(prompt: string, lang: string) {
    return await translateUseCase( this.openai, { prompt, lang });
  }
}

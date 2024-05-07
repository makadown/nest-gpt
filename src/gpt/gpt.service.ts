import * as path from "path";
import * as fs from "fs";
import { Injectable, NotFoundException } from '@nestjs/common';
import { ortographyCheckUseCase, proConsDiscusserStreamUseCase, proConsDiscusserUseCase, textToAudioUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto } from './dtos';
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
  
  async textToAudio({ prompt, voice}: TextToAudioDto) {
    return await textToAudioUseCase(this.openai,{ prompt, voice });
  }

  async textToAudioGet(fileId: string) {
    const filePath = path.resolve(__dirname, `../../generated/audios/${fileId}.mp3`)
    const fileFound = fs.existsSync(filePath);
    if (!fileFound) {
        throw new NotFoundException(`File ${fileId} not found`);
    }
    return filePath;
  }
}

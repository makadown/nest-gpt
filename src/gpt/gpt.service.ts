import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

/**
 * This service os going to call only Use Cases
 */
@Injectable()
export class GptService {

  constructor() {}

  async ortographyCheck(orthographyDto: OrthographyDto) {
    return await ortographyCheckUseCase({ prompt: orthographyDto.prompt });
  }
}

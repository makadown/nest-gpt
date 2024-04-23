import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases';

/**
 * This service os going to call only Use Cases
 */
@Injectable()
export class GptService {

  constructor() {}

  async ortographyCheck() {
    return await ortographyCheckUseCase();
  }
}

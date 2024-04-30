import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.ortographyCheck(orthographyDto);
  }

  @Post('pro-cons-discusser')
  proConsDiscusser(@Body() proConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(proConsDiscusserDto);
  }

  @Post('pro-cons-discusser-stream')
  async proConsDiscusserStream(
      @Body() proConsDiscusserDto: ProsConsDiscusserDto,
      @Res() res: Response
    ) {
     const stream = await this.gptService.prosConsDiscusserStream(proConsDiscusserDto);
     
     res.setHeader('Content-Type', 'application/json');
     res.status(HttpStatus.OK);

     for await(const chunk of stream) {
        const piece = chunk.choices[0].delta.content || '';
        res.write(piece);
     }

     res.end();
  }
}

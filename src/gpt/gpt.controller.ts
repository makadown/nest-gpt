import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import { AudioToTextDto, OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto, ImageGenerationDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @Post('translate')
  translate(@Body() translateDto: TranslateDto) {
    return this.gptService.translate(translateDto.prompt, translateDto.lang);
  }

  @Post('text-to-audio')
  async textToAudio(
      @Body() textToAudioDto: TextToAudioDto,
      @Res() res: Response
  ) {
    const filePath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGet(
      @Param('fileId') fileId: string,
      @Res() res: Response
  ) {
    const filePath = await this.gptService.textToAudioGet(fileId);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }
  
  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file',{
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;
          return callback(null, fileName);
        }    
      })
    })
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024, message: 'File is too large' }),
          new FileTypeValidator({ fileType: 'audio/*' }),
        ],
      })
    ) file: Express.Multer.File,
    @Body() audioToTextDto: AudioToTextDto
  ) {
    return await this.gptService.audioToText(audioToTextDto?.prompt??'', file);
  }

  @Post('image-generation')
  async imageGeneration(@Body() imageGenerationDto: ImageGenerationDto) {
    return this.gptService.imageGeneration(imageGenerationDto);
  }

  /**
   * Retrieves image from generated images folder
   * ie:  http://localhost:3000/gpt/image-generation/1715375191216.png
   * @returns 
   */
  @Get('image-generation/:fileName')
  async getImage(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = await this.gptService.imageGet(fileName);
    res.setHeader('Content-Type', 'image/png');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }
  
}

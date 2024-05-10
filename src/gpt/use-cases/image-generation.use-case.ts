import OpenAI from 'openai';
import { ImageGenerationDto } from '../dtos/image-generation.dto';
import { downloadImageAsPng } from 'src/helpers';

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const ImageGenerationUseCase = async(openai: OpenAI, options: Options) => {
    
    const { prompt, originalImage, maskImage } = options;

    // TODO: Verificar originalImage
    
    const response = await openai.images.generate({
        prompt,
        model: 'dall-e-3',
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url',
    });

    // TODO: Guardar imagen en FS
    await downloadImageAsPng(response.data[0].url);

    return {
        url: response.data[0].url,
        localPath: '',
        revised_prompt: response.data[0].revised_prompt
    };
    
}
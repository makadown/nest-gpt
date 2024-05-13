import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { downloadBase64ImageAsPng, downloadImageAsPng } from '../../helpers';

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const ImageGenerationUseCase = async(openai: OpenAI, options: Options) => {
    
    const { prompt, originalImage, maskImage } = options;
    
    if (!originalImage || !maskImage) {
        const response = await openai.images.generate({
            prompt,
            model: 'dall-e-3',
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            response_format: 'url',
        });
            
        const fileName =await downloadImageAsPng(response.data[0].url);
        const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;
    
        return {
            url: url,
            openAIUrl: response.data[0].url,
            revised_prompt: response.data[0].revised_prompt
        };
    }
    // i.e. originalImage = http://localhost:3000/gpt/image-generation/1715632069429.png
    const pngImagePath = await downloadImageAsPng(originalImage, true);
    // i.e. maskImage=Base64:ASDKajsdgfjhsdkfsdkjhfskdjfhksadfsdkj
    const maskPath = await downloadBase64ImageAsPng(maskImage, true);

    const response = await openai.images.edit({
        model: 'dall-e-2',
        prompt: prompt,
        image: fs.createReadStream(pngImagePath),
        mask: fs.createReadStream(maskPath),
        n: 1,
        size: '1024x1024',
        response_format: 'url',
    });
    
    const localImagePath = await downloadImageAsPng(response.data[0].url);
    const fileName = path.basename(localImagePath);

    const publicUrl = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

    return {
        url: publicUrl,
        openAIUrl: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt
    };
}
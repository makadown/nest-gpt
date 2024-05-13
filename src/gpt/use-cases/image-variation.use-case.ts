import OpenAI from "openai";
import * as fs from 'fs';
import * as path from 'path';
import { downloadImageAsPng } from "src/helpers";
import { ImageVariationDto } from '../dtos/image-variation.dto';

interface Options {
    baseImage: string;
}

export const ImageVariationUseCase = async (openai: OpenAI, options: Options) => {

    const { baseImage } = options;

    // Aquí necesito el path absoluto de la imagen aqui en el server
    const pngImagePath = await downloadImageAsPng(baseImage, true);

    const response = await openai.images.createVariation({
        model: 'dall-e-2',
        image: fs.createReadStream(pngImagePath),
        n: 1,
        size: '1024x1024',
        response_format: 'url',
    });

    const newImage = await downloadImageAsPng(response.data[0].url);
    const localImagePath = await downloadImageAsPng(response.data[0].url);
    const fileName = path.basename(localImagePath);

    const publicUrl = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

    return {
        url: publicUrl,
        openAIUrl: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt
    };

}
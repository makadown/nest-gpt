import { InternalServerErrorException } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';


export const downloadImageAsPng = async (url: string) => {
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new InternalServerErrorException(`Failed to download image: ${url}`);
    }

    const folderPath = path.resolve('./', './generated/images');
    fs.mkdirSync(folderPath, { recursive: true });

    const imageNamePng = `${new Date().getTime()}.png`;
    const buffer = Buffer.from(await response.arrayBuffer());
    // now save the file in generated/images folder
    fs.writeFileSync(`${folderPath}/${imageNamePng}`, buffer);

}
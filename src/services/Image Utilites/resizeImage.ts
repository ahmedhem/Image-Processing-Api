import sharp = require('sharp');
import path from "path";
import * as buffer from "buffer";

export class resizeImage {
    width: number;
    height: number;
    fileName: string;
    imagesDir: string;
    outputDir: string;
    newFileName:string;
    public constructor(width: number, height: number, fileName: string, imagesDir: string, outputDir: string) {
        this.width = width;
        this.height = height;
        this.fileName = fileName;
        this.imagesDir = imagesDir;
        this.outputDir = outputDir;
        this.newFileName = fileName.slice(0, -4) + '_' + width + '_' + height + '.jpg';
    }

    async run():Promise<Buffer> {
            await sharp(path.join(this.imagesDir, `${this.fileName}`))
                .resize(this.width, this.height)
                .toFile(this.outputDir + '/' + this.newFileName);
            const resizedImage: Buffer = await sharp(
                path.join(this.imagesDir, `${this.fileName}`)
            )
                .resize(this.width, this.height)
                .png()
                .toBuffer();
            return resizedImage;
    }
}

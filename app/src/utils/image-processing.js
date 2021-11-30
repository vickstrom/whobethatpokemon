import Jimp from 'jimp';

export default class ImageProcessing {

    static getImageInSolidColor = async (image_link, R, G, B) => {
        const image = await Jimp.read(image_link); 
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            image.bitmap.data[idx] = R;
            image.bitmap.data[idx + 1] = G;
            image.bitmap.data[idx + 2] = B;
        });
        return await image.getBase64Async(Jimp.MIME_PNG);
    }

}
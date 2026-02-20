import fs from 'fs';
import https from 'https';
import sharp from 'sharp';

const url = "https://hiee.in/media/logo1.png";
const dest = "./public/hiee-logo.png";
const temp = "./temp-hiee-logo.png";

https.get(url, (res) => {
    const file = fs.createWriteStream(temp);
    res.pipe(file);
    file.on('finish', async () => {
        file.close();

        try {
            // Get image metadata
            const metadata = await sharp(temp).metadata();

            // Assuming the logo is on the left and has a circular aspect ratio,
            // we will crop a square of size based on the height.
            const size = metadata.height;

            await sharp(temp)
                .extract({ width: size, height: size, left: 0, top: 0 })
                .toFile(dest);

            console.log("Image cropped and saved to " + dest);

            // Clean up temp
            fs.unlinkSync(temp);
        } catch (err) {
            console.error("Error processing image:", err);
        }
    });
}).on('error', (err) => {
    console.error("Error downloading image:", err);
});

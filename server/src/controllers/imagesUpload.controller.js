import path, { dirname } from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = path.join(__dirname, '../../../server')

const imageUpload = async (req,res) => {
    try {
        const filePath = req.file.path;
        const downloadDir = path.join(rootDir,'downloads')
        
        if(!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, {
                recursive: true
            })
        }
        
        const processedImagePath = path.join(downloadDir, `processed-${req.file.filename}.avif`)
        
        const info  = await sharp(filePath)
            .avif({
                effort: 9
            })
            .toFile(processedImagePath)

        return res
        .status(200)
        .json({
            message: "Image Upload and Processed",
            // processedImagePath: processedImagePath,
            // info: info
        })
    } catch (error) {
        console.log(`::: ERROR PROCESSING IMAGE => ${error} :::`);
        return res
        .status(500)
        .json({
            error: 'INTERNAL SERVER ERROR'
        })
    }
}

export {
    imageUpload
}
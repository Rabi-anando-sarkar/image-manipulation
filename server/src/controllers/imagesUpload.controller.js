import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url';
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { Image } from '../models/image.model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const convertImageFormat = async (inputFilePath,outputFilePath,outputFormat) => {
    try {        
        await sharp(inputFilePath)
            .toFormat(outputFormat)
            .toFile(outputFilePath)
        console.log(`Your file saved in ${outputFilePath}`);
    } catch (error) {
        throw new Error(`Error changing format`)
    } 
}

const changeImageFormat = async (req,res) => {
    try {
        // also store the user session id with token so that it can be used to identify which users image is which one
        // as a response give a downloadable link to the user or auto download the file in users device

        // getting image path
        const imageLocalPath = req.files?.image[0].path
        
        // check if image path is there
        if(!imageLocalPath) {
            throw new Error("Avatar file is required")
        }
        
        // getting to which format it is to be converted
        const { format} = req.body 

        // check if format is there
        if(!format) {
            throw new Error('Format type required')
        }

        // creating a unique name for converted file name
        const currentDate = new Date().toISOString().split('T')[0]
        const randomInteger = Array.from({length: 19}, () => Math.floor(Math.random() * 10)).join('').padStart(20, Math.floor(Math.random() * 9) + 1)
        const uniqueName = currentDate + '-' + randomInteger

        const convertedFileName = `${uniqueName}.${format}`
        const convertedLocalPath = path.join(__dirname, '../../converted', convertedFileName)

        // using convert image helper function
        await convertImageFormat(imageLocalPath,convertedLocalPath,format)

        // uploading on cloudinary
        const imageConverted = await uploadOnCloudinary(convertedLocalPath)

        // checking if it got uploaded
        if(!imageConverted) {
            throw new Error('Converted Image File Required')
        }

        // uploading on database
        const image = await Image.create({
            imageUrl: imageConverted.url,
            format: imageConverted.format
        })

        // check if image got uploaded
        if(!image) {
            throw new Error("No Image got uploaded in database")
        }

        console.log(image);

        return res
        .status(200)
        .json({
            message: "Image Upload and Processed",
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
    changeImageFormat
}
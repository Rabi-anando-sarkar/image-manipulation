import path from 'path'
import { fileURLToPath } from 'url';
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { Image } from '../models/image.model.js';
import { 
    handlingImageBlur,
    handlingImageFormatConversion,
    handlingImageGreyscale,
    handlingImageNegative,
    handlingImageRotation,
    handlingImageTint
} from '../utils/sharp.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'

const generatingFileName = (format) => {
    const currentDate = new Date().toISOString().split('T')[0]
    const randomInteger = Array.from({length: 19}, () => Math.floor(Math.random() * 10)).join('').padStart(20, Math.floor(Math.random() * 9) + 1)
    const uniqueName = `${currentDate}-${randomInteger}`
    const convertedFileName = `${uniqueName}.${format}`
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const convertedLocalPath = path.join(__dirname, '../../converted', convertedFileName)

    return convertedLocalPath
}

const tokenGeneration = async(imageId) => {
    try {
        const image = await Image.findById(imageId)
        const token = image.generateToken()
        image.token = token
        await image.save(
            {
                validateBeforeSave: false
            }
        )
        return token
    } catch (error) {
        throw new Error('Token not generated')
    }
} 

const changingImageFormat = asyncHandler( async (req,res) => {
    const imageLocalPath = req.files?.image[0].path

    if(!imageLocalPath) {
        throw new ApiError(
            400,
            `::: Image Upload Failed :::`
        )
    }

    const { format } = req.body

    if(!format) {
        throw new ApiError(
            400,
            `::: Format not specified :::`
        )
    }

    const convertedLocalPath = generatingFileName(format)

    await handlingImageFormatConversion(imageLocalPath,convertedLocalPath,format)

    const newImage = await uploadOnCloudinary(convertedLocalPath)

    if(!newImage) {
        throw new ApiError(
            400,
            `Uploading on Cloud failed`
        )
    }

    const image = await Image.create({
        imageUrl: newImage.secure_url,
        format: newImage.format,
        publicID: newImage.public_id
    })

    if(!image) {
        throw new ApiError(
            400,
            `Upload on data base failed`
        )
    }

    const token = await tokenGeneration(image._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    console.log(`::: Download Link :: ${image.imageUrl} :::`);
    fs

    res
        .status(200)
        .cookie("Token",token,options)
        .json(new ApiResponse(
            200,
            image.imageUrl,
            "Format change Image Operation Done Succesfully"
        ))
} )

const changingImageGreyScale = asyncHandler( async (req,res)  => {
    const imageLocalPath = req.files?.image[0].path
    
    if(!imageLocalPath) {
        throw new ApiError(
            400,
            `::: Image Upload Failed :::`
        )
    }

    const format = path.extname(imageLocalPath).slice(1)

    const convertedLocalPath = generatingFileName(format)

    await handlingImageGreyscale(imageLocalPath,convertedLocalPath)
    
    const newImage = await uploadOnCloudinary(convertedLocalPath)

    if(!newImage) {
        throw new ApiError(
            400,
            `::: Uploading on Cloud failed :::`
        )
    }
    
    const image = await Image.create({
        imageUrl: newImage.secure_url,
        format: newImage.format,
        publicID: newImage.public_id
    })

    if(!image) {
        throw new ApiError(
            400,
            `Upload on data base failed`
        )
    }

    const token = await tokenGeneration(image._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    console.log(`::: Download Link :: ${image.imageUrl} :::`);

    res
        .status(200)
        .cookie("Token",token,options)
        .json(new ApiResponse(
            200,
            image.imageUrl,
            "GreyScale Image Operation Done Succesfully"
        ))

} )

const changingImageTint = asyncHandler( async (req,res) => {
    const imageLocalPath = req.files?.image[0].path

    if(!imageLocalPath) {
        throw new ApiError(
            400,
            `::: Image Upload Failed :::`
        )
    }

    const format = path.extname(imageLocalPath).slice(1)
    
    const convertedLocalPath = generatingFileName(format)
    
    const {r,g,b} = req.body
    
    await handlingImageTint(imageLocalPath,convertedLocalPath,r,g,b)

    const newImage = await uploadOnCloudinary(convertedLocalPath)

    if(!newImage) {
        throw new ApiError(
            400,
            `::: Uploading on Cloud failed :::`
        )
    }

    const image = await Image.create({
        imageUrl: newImage.secure_url,
        format: newImage.format,
        publicID: newImage.public_id
    })

    if(!image) {
        throw new ApiError(
            400,
            `Upload on data base failed`
        )
    }

    const token = await tokenGeneration(image._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    console.log(`::: Download Link :: ${image.imageUrl} :::`);

    res
        .status(200)
        .cookie("Token",token,options)
        .json(new ApiResponse(
            200,
            image.imageUrl,
            "Tint Image Operation Done Succesfully"
        ))
})

const changingImageRotation = asyncHandler( async (req,res) => {
    const imageLocalPath = req.files?.image[0].path

    if(!imageLocalPath) {
        throw new ApiError(
            400,
            `::: Image Upload Failed :::`
        )
    }

    const format = path.extname(imageLocalPath).slice(1)

    const convertedLocalPath = generatingFileName(format)

    const { degree } = req.body

    await handlingImageRotation(imageLocalPath,convertedLocalPath,degree)

    const newImage = await uploadOnCloudinary(convertedLocalPath)

    if(!newImage) {
        throw new ApiError(
            400,
            `::: Uploading on Cloud failed :::`
        )
    }

    const image = await Image.create({
        imageUrl: newImage.secure_url,
        format: newImage.format,
        publicID: newImage.public_id
    })

    if(!image) {
        throw new ApiError(
            400,
            `Upload on data base failed`
        )
    }

    const token = await tokenGeneration(image._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    console.log(`::: Download Link :: ${image.imageUrl} :::`);

    res
        .status(200)
        .cookie("Token",token,options)
        .json(new ApiResponse(
            200,
            image.imageUrl,
            "Rotation Image Operation Done Succesfully"
        ))
})

const changingImageBlur = asyncHandler( async (req,res) => {
    const imageLocalPath = req.files?.image[0].path

    if(!imageLocalPath) {
        throw new ApiError(
            400,
            `::: Image Upload Failed :::`
        )
    }

    const format = path.extname(imageLocalPath).slice(1)

    const convertedLocalPath = generatingFileName(format)

    let { level } = req.body

    level = level && !isNaN(level) && level >= 0.3 && level <= 1000 ? parseFloat(level) : 5;

    await handlingImageBlur(imageLocalPath,convertedLocalPath,level)

    const newImage = await uploadOnCloudinary(convertedLocalPath)

    if(!newImage) {
        throw new ApiError(
            400,
            `::: Uploading on Cloud failed :::`
        )
    }

    const image = await Image.create({
        imageUrl: newImage.secure_url,
        format: newImage.format,
        publicID: newImage.public_id
    })

    if(!image) {
        throw new ApiError(
            400,
            `Upload on data base failed`
        )
    }

    const token = await tokenGeneration(image._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    console.log(`::: Download Link :: ${image.imageUrl} :::`);

    res
        .status(200)
        .cookie("Token",token,options)
        .json(new ApiResponse(
            200,
            image.imageUrl,
            "Blur Image Operation Done Succesfully"
        ))
})

const changingImageNegative = asyncHandler( async (req,res) => {
    const imageLocalPath = req.files?.image[0].path

    if(!imageLocalPath) {
        throw new ApiError(
            400,
            `::: Image Upload Failed :::`
        )
    }

    const format = path.extname(imageLocalPath).slice(1)

    const convertedLocalPath = generatingFileName(format)


    await handlingImageNegative(imageLocalPath,convertedLocalPath)

    const newImage = await uploadOnCloudinary(convertedLocalPath)

    if(!newImage) {
        throw new ApiError(
            400,
            `::: Uploading on Cloud failed :::`
        )
    }

    const image = await Image.create({
        imageUrl: newImage.secure_url,
        format: newImage.format,
        publicID: newImage.public_id
    })

    if(!image) {
        throw new ApiError(
            400,
            `Upload on data base failed`
        )
    }

    const token = await tokenGeneration(image._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    console.log(`::: Download Link :: ${image.imageUrl} :::`);

    res
        .status(200)
        .cookie("Token",token,options)
        .json(new ApiResponse(
            200,
            image.imageUrl,
            "Negative Image Operation Done Succesfully"
        ))
})

export {
    changingImageFormat,
    changingImageGreyScale,
    changingImageTint,
    changingImageRotation,
    changingImageBlur,
    changingImageNegative
}
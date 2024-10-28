import sharp from 'sharp'
import fs from "fs";

//* Output Options

export const handlingImageFormatConversion = async (inputFilePath,outputFilePath,outputFormat) => {
    try {        
        await sharp(inputFilePath)
            .toFormat(outputFormat)
            .toFile(outputFilePath)
        console.log(`::: Your file saved in ${outputFilePath} :::`);
    } catch (error) {
        throw new Error(`::: Error changing format :: ${error.message} :::`)
    } 
}

//* Image manipulation

export const handlingImageGreyscale = async (inputFilePath,outputFilePath) => {
    try {        
        await sharp(inputFilePath)
            .greyscale()
            .toFile(outputFilePath)
        console.log(`::: Your file saved in ${outputFilePath} :::`);
    } catch (error) {
        throw new Error(`::: Error converting to greyscale :: ${error.message} :::`)
    } 
}

export const handlingImageTint = async (inputFilePath,outputFilePath,r=0,g=0,b=0) => {
    try {        
        await sharp(inputFilePath)
            .tint({
                r,
                g,
                b,
            })
            .toFile(outputFilePath)
        console.log(`::: Your file saved in ${outputFilePath} :::`);
    } catch (error) {
        throw new Error(`::: Error applying tint :: ${error.message} :::`)
    } 
}

//* Image Operations

export const handlingImageRotation = async (inputFilePath,outputFilePath,degree=90) => {
    try {     
        let d = parseInt(degree)   
        await sharp(inputFilePath)
            .rotate(d)
            .toFile(outputFilePath)
        console.log(`::: Your file saved in ${outputFilePath} :::`);
    } catch (error) {
        throw new Error(`::: Error rotating image :: ${error.message} :::`)
    } 
}

export const handlingImageBlur= async (inputFilePath,outputFilePath,level) => {
    try {       
        await sharp(inputFilePath)
            .blur(level)
            .toFile(outputFilePath)
        console.log(`::: Your file saved in ${outputFilePath} :::`);
    } catch (error) {
        throw new Error(`::: Error applying blur: ${error.message} :::`)
    } 
}

export const handlingImageNegative= async (inputFilePath,outputFilePath) => {
    try {        
        await sharp(inputFilePath)
            .negate()
            .toFile(outputFilePath)
        console.log(`::: Your file saved in ${outputFilePath} :::`);
    } catch (error) {
        throw new Error(`::: Error applying negative filter: ${error.message} :::`)
    } 
}
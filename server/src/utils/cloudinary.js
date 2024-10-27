import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        const uniquePublicId = Math.floor(Math.random() * 999999)
        
        // upload file on cloudinary with presets
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto',
            public_id: uniquePublicId,
            folder: 'to_be_converted',
            allowed_formats: ['jpg','png','webp','tiff','gif','avif']
        })
        console.log(`::: File is Uploaded in Cloudinary :::`);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(`::: File is not Uploaded in Cloudinary :::`);
        return null;
    }
}

export {
    uploadOnCloudinary
}
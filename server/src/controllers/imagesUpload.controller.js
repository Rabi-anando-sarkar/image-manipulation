import sharp from 'sharp'

const imageUpload = async (req,res) => {
    try {
        
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
    imageUpload
}
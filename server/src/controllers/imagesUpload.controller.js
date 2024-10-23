const imageUpload = (req,res) => {
    try {
        console.log(`Hello world`);
        return res
        .status(200)
        .json({
            message: "Its Working"
        })
    } catch (error) {
        console.log(`::: ERROR GENERATING SHORT URL => ${error} :::`);
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
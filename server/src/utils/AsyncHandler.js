const asyncHandler = (requestHandlerFunction) => async (req,res,next) => {
    try {
        return await requestHandlerFunction(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

export {asyncHandler}
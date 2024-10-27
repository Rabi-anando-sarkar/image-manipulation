import multer from 'multer'

const storage = multer.diskStorage({

    // destination where the images will upload in the server

    destination: function(req,file,cb) {
        cb(null, './public/temp') // Directory where the file gets saved
    },
    filename: function (req, file, cb) {
        
        // Generating a unique name for the uploaded file
        const currentDate = new Date().toISOString().split('T')[0];
        const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
        const uniqueSuffix = currentDate + '-' + randomSixDigit; 

        // Using the file extension
        const fileExtension = file.originalname.split('.').pop();

        // Save with unique name
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension); 
    }
})


// export const upload = multer({ storage })

const upload = multer({
    storage: storage
})

export default upload
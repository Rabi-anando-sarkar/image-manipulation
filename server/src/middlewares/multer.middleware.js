import multer from 'multer'

const storage = multer.diskStorage({

    // destination where the images will upload in the server

    destination: function(req,file,cb) {
        cb(null, './public/temp') // Directory where the file gets saved
    },
    filename: function (req, file, cb) {
        
        // Generating a unique name for the uploaded file
        const currentDate = new Date().toISOString().split('T')[0];
        const randomSixDigit = Array.from({length: 19}, () => Math.floor(Math.random() * 10)).join('').padStart(20, Math.floor(Math.random() * 9) + 1);
        const uniqueSuffix = currentDate + '-' + randomSixDigit; 

        // Using the file extension
        const fileExtension = file.originalname.split('.').pop();

        // Save with unique name
        cb(null,uniqueSuffix + '.' + fileExtension); 
    }
})


// export const upload = multer({ storage })

const upload = multer({
    storage: storage
})

export default upload
import { Router } from "express";
import { changeImageFormat } from "../controllers/imagesUpload.controller.js";
import upload  from '../middlewares/multer.middleware.js'

const router = Router()

router.route('/image-upload').post(
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),changeImageFormat)

export default router
import { Router } from "express";
import { 
    changingImageFormat,
    changingImageGreyScale,
    changingImageTint,
    changingImageRotation,
    changingImageBlur,
    changingImageNegative
} from "../controllers/imagesUpload.controller.js";
import upload  from '../middlewares/multer.middleware.js'

const router = Router()

router.route('/image-format').post(
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),changingImageFormat)

router.route('/image-greyscale').post(
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),changingImageGreyScale)

router.route('/image-tint').post(
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),changingImageTint)

router.route('/image-rotation').post(
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),changingImageRotation)

router.route('/image-blur').post(
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),changingImageBlur)

router.route('/image-negative').post(
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),changingImageNegative)

export default router
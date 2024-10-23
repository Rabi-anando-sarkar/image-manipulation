import { Router } from "express";
import { imageUpload } from "../controllers/imagesUpload.controller.js";
import upload from "../utils/index.js";

const router = Router()

router.route('/image-upload').post(upload.single('image') ,imageUpload)

export default router
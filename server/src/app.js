import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}))

app.use(express.static('public'))

import imageRouter from './routes/images.routes.js'

app.use('/api/v1/imagesUpload', imageRouter)

export { app }
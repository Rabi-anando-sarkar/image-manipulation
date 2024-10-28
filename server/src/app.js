import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

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

app.use(cookieParser())

import imageRouter from './routes/images.routes.js'

app.use('/api/v1/images', imageRouter)

export { app }
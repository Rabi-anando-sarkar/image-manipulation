import { Schema, model } from 'mongoose'

const imageSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
    format: {
        type: String,
        enum: ['jpg','png','gif','avif','webp'],
        required: true
    },
    watermarkRemoved: {
        type: Boolean,
        default: false
    },
    watermarkRequested: {
        type: Boolean,
        default: false,
    },
    conversionDetails: {
        coverted: {
            type: Boolean,
            default: false
        },
        formatConvertedTo: {
            type: String,
            enum: ['jpg','png','gif','avif','webp']
        }
    }
},{
    timestamps: true
}
)

export const Image = model("Image", imageSchema)
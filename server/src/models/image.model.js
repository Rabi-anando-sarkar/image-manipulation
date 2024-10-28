import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken';

const imageSchema = new Schema(
    {
        imageUrl: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            enum: ["jpg", "png", "gif", "avif", "webp"],
            required: false,
        },
        publicID: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

imageSchema.methods.generateToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            imageUrl: this.imageUrl,
            format: this.format,
            publicID: this.publicID
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}

export const Image = model("Image", imageSchema);

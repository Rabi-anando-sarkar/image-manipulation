import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken'

const sessionSchema = new Schema({
    sessionId: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: "Image"
        }
    ]
},{
    timestamps: true
})

sessionSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            sessionId: this.sessionId
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

sessionSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Session = model('Session', sessionSchema)


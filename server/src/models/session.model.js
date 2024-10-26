import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
    sessionId: {
        type: String,
        required: true,
    },
    token: {
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
}
)

export const Session = model('Session', sessionSchema)


import { Schema, model } from "mongoose";

const imageSchema = new Schema(
    {
        imageUrl: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            enum: ["jpg", "png", "gif", "avif", "webp"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Image = model("Image", imageSchema);

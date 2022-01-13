import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    },
    datePublished: {
        type: Number,
        required: true
    },
    serialNumber: {
        type: Number,
        required: true
    }
},
    { timestamps: true })

export default mongoose.model('Books', BookSchema)
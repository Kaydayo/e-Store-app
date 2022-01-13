import mongoose from 'mongoose';


const AuthorSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
},
    { timestamps: true })

export default mongoose.model('Authors', AuthorSchema)
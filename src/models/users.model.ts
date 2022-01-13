import mongoose, { Document } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    DOB: string;
    email: string;
    phoneNumber: string;
    password: string;


}

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'please enter a valid email',
        },
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    }
},
    { timestamps: true })


UserSchema.pre<IUser>('save', async function (next) {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

UserSchema.methods.comparePassword = async function (canditatePassword: string) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};





export default mongoose.model('Users', UserSchema)
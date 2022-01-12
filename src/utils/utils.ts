import Joi, { string } from 'joi'


export const validateEntry = (data: author) => {
    const schema = Joi.object({
        authorId: Joi.string(),
        author: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    }).unknown();
    return schema.validate(data);
}

export const validateBooks = (data: books) => {
    const schema = Joi.object({
        authorId: Joi.string(),
        name: Joi.string().required(),
        isPublished: Joi.boolean().required(),
        datePublished: Joi.number().required(),
        serialNumber: Joi.number().required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    }).unknown();
    return schema.validate(data);
}

export const validateRegisteration = (data: users) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(8).required(),
        DOB: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required()
    }).unknown();
    return schema.validate(data);
}

export const validateLogin = (data: login) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(data);
}

export interface author {
    id?: string,
    author: string,
    age: number,
    address: string
}

export interface books {
    id?: string,
    name: string,
    isPublished: boolean,
    datePublished: Date,
    serialNumber: number
}

export interface users extends Document {
    id?: string,
    firstName: string,
    lastName: string,
    password: string,
    DOB: Date,
    email: string,
    phoneNumber: string
}

export interface login {
    email: string,
    password: string
}







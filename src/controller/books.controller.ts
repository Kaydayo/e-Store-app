import express, { Request, Response, NextFunction } from 'express';
import { validateEntry, validateBooks, validateLogin, validateRegisteration } from '../utils/utils';
import bcrypt from 'bcryptjs';
import Book from '../models/book.model';
import Author from '../models/authors.model';
import User from '../models/users.model';
import jwt, { Secret } from 'jsonwebtoken'
import { pagination } from '../utils/pagination';


// const control = express()

export const getAllAuthors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = res.paginatedResults
        res.status(200).json({ message: 'successful', result })
    } catch (err) {
        console.log(err)
        res.status(400).send('Not Found')
    }

}

export const getAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = await Author.findOne({ authorId: req.params.id }) //.select('-password');
        if (!author) {
            throw new Error(`No user with id : ${req.params.id}`);
        }
        console.log(author)
        let reg = /[a-z]/g;
        const id = author.authorId
        const idArr = id.split(reg)
        let idNum = parseInt(idArr[idArr.length - 1])
        res.status(200).json({ next: idNum + 1, previous: idNum - 1, data: [author] })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: `Author Not Found` })
    }
}

export const postAuthors = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateEntry(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    } else {
        try {
            const authorL = await Author.find().sort({ _id: -1 }).limit(1);
            console.log(authorL)
            let authorId;
            if (authorL.length === 0) {
                authorId = 'author1';
            }
            else {
                let lastAuthor = authorL[0].authorId;
                let reg = /[a-z]/g;
                let regArr = lastAuthor.split(reg)
                let regNum = regArr[regArr.length - 1]
                authorId = `author${parseInt(regNum) + 1}`
            }
            const newData = { authorId, ...req.body }
            const author = await Author.create({ ...newData })
            res.status(200).json({ message: 'successful', data: { author } })
        } catch (err) {
            console.log(err)
            res.status(400).send('invalid')
        }
    }
}

export const updateAuthor = async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    try {

        const updateData = { ...req.body }
        console.log(updateData)
        const author = await Author.findOneAndUpdate({ authorId: id }, updateData, { new: true })
        res.status(200).json({ message: 'successful', data: { author } })
    } catch (err: any) {
        res.status(400).send(err.message)
    }
}

export const deleteAuthor = async (req: Request, res: Response, _next: NextFunction) => {
    const author = await Author.findOneAndDelete({ authorId: req.params.id })
    if (!author) {
        throw new Error(`No author with id: $(req.params.id)`)
    }
    await author.remove();
    res.status(200).json({ message: 'successfully deleted author' })

}

export const postBook = async (req: Request, res: Response, _next: NextFunction) => {
    const { error } = validateBooks(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    } else {
        try {
            const bookL = await Book.find({ authorId: req.params.id }).sort({ _id: -1 }).limit(1);
            let bookId;
            let authorId = req.params.id
            if (bookL.length === 0) {
                bookId = 'book1';
            }
            else {
                let lastBook = bookL[0].bookId;
                let reg = /[a-z]/g;
                let regArr = lastBook.split(reg)
                let regNum = regArr[regArr.length - 1]
                bookId = `book${parseInt(regNum) + 1}`
            }
            const newData = { authorId, bookId, ...req.body }
            const book = await Book.create({ ...newData })
            res.status(200).json({ message: 'successful', data: [book] })
        } catch (err) {
            console.log(err)
            res.status(400).send('invalid')
        }
    }
}

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const { id, bookId } = req.params
    try {
        const book = await Book.findOneAndDelete({ authorId: id, bookId: bookId })
        if (!book) {
            throw new Error(`No books with id ${bookId}`)
        }
        await book.remove({ bookId: bookId })
        res.status(200).json({ message: 'successfully deleted book' })
    } catch (err: any) {
        res.status(400).json('invalid ')
    }

}


export const getABook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.findOne({ authorId: req.params.id, bookId: req.params.bookId })
        if (!book) {
            throw new Error(`No book found `);
        }
        let reg = /[a-z]/g;
        const id = book.bookId
        const idArr = id.split(reg)
        let idNum = parseInt(idArr[idArr.length - 1])
        res.status(200).json({ next: idNum + 1, previous: idNum - 1, data: [book] })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: `Book Not Found` })
    }
}


export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = res.paginatedResults
        res.status(200).json({ message: 'successful', result })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
    //     const result = res.paginatedResults
    //     res.status(200).json({ message: 'successful', result })
    // } catch (err) {
    //     console.log(err)
    //     res.status(400).send('Not Found')
    // }
}


export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateData = { ...req.body }
        const book = await Book.findOneAndUpdate({ authorId: req.params.id, bookId: req.params.bookId }, updateData, { new: true })
        res.status(200).json({ message: 'successful', data: { book } })

    } catch (err: any) {
        res.status(400).json({ message: 'author has no book' })
    }
}



export const loginAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateLogin(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    } else {
        try {
            const email = req.body.email
            const user = { email }
            const findUser = await User.findOne({ email: req.body.email })
            if (!findUser) return res.status(400).json({ message: 'Invalid login credentials' });
            const match = await bcrypt.compare(req.body.password, findUser.password)
            if (!match) return res.status(400).json({ message: 'invalid login credentials' })
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as Secret)
            res.status(201).json({ message: 'successful', accessToken })
        } catch (error) {
            res.status(401).send('invalid, user not found')
        }
    }

}

export const registerAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateRegisteration(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    } else {
        try {
            const userAlreadyExists = await User.findOne({ email: req.body.email })
            if (userAlreadyExists) return res.status(403).json({ message: 'Email already exists' })
            const newData = { ...req.body }
            const newUser = await User.create({ ...newData })
            const accessToken = jwt.sign(newUser.email, process.env.ACCESS_TOKEN_SECRET as Secret)
            res.status(200).json({ message: 'signup successful', accessToken })
        } catch (err: any) {
            res.status(400).json({ error: `${err.message}` })
        }
    }

}


export const logoutAuthor = async (req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({ accessToken: null })
}






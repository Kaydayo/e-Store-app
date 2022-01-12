import usersModel from "../models/users.model"
import { author, books } from './utils'
import { Request, Response, NextFunction } from 'express'


interface Result {
    next: number,
    prev: number,
}

declare module "express-serve-static-core" {
    interface Response {
        paginatedResults?: string | object;
    }
}


export const pagination = (collectionData: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const page: any = parseInt(req.query.page as string)
        const limit: any = parseInt(req.query.limit as string)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        let results: { [key: string]: number | author[] | books[] } = {}
        if (endIndex < await collectionData.countDocuments().exec()) {
            results.next = page + 1
        }
        if (startIndex > 0) {
            results.previous = page - 1
        }
        try {

            results.data = await collectionData.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = results
            next()
        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }



    }
}


export const paginateBooks = (collectionData: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const page: any = parseInt(req.query.page as string)
        const limit: any = parseInt(req.query.limit as string)
        try {
            const content = await collectionData.aggregate([{ $match: { authorId: req.params.id } }]).sort({ _id: 1 })
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            let results: { [key: string]: number | author[] | books[] } = {}
            if (endIndex < content.length) {
                results.next = page + 1
            }
            if (startIndex > 0) {
                results.previous = page - 1
            }

            results.data = content.slice(startIndex, endIndex);
            res.paginatedResults = results
            next()
        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }



    }
}
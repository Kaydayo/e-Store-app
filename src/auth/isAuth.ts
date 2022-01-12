import dotenv from 'dotenv'
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";

dotenv.config()
declare module "express-serve-static-core" {
    interface Request {
        user?: string | JwtPayload;
    }
}


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];
    const token = authorization && authorization.split(' ')[1];
    if (token == null) return res.status(401).json({ message: 'you need to login' })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, user) => {
        if (err) {
            return res.status(403)
        }
        req.user = user;
        next()
    })
}
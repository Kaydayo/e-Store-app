import { Response, Request, NextFunction, response } from 'express';
import { HttpError } from 'http-errors';
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import { fakeUserData } from '../db/fixtures'
const fakeAuthorData = {
    author: "John Doe",
    age: 28,
    address: "5, Wall Street, Buckingham"
}
const fakeBookData = {
    name: "Tomorrow is coming",
    isPublished: true,
    datePublished: 1637159508581,
    serialNumber: 10
}


let token: string
let authorID: string
let bookID: string


describe('AUTHORIZATION & AUTHENTICATION', () => {
    test('register a user', async () => {

        try {
            const response = await supertest(app)
                .post("/register")
                .send(fakeUserData)

            expect(response.body.statusCode).toBe(200)

        } catch (e) {

        }
    })

    test('should require authorization for getAllAuthors', async () => {

        try {
            const response = await supertest(app)
                .get('/authors')

            expect(response.statusCode).toBe(401)
        } catch (e) {

        }
    })


    test('should require authorization for getAuthor', async () => {

        try {
            const response = await supertest(app)
                .get('/authors/author1')
            expect(response.statusCode).toEqual(401)
        } catch (e) {

        }
    })

})


describe('GET AUTHORS & BOOKS', () => {


    test('should getAllAuthors for authorized user', async () => {
        const postResponse = await supertest(app)
            .post('/login')
            .send({ email: fakeUserData.email, password: fakeUserData.password })

        token = postResponse.body.accessToken


        const getResponse = await supertest(app)
            .get("/authors?page=1&limit=5")
            .set('Authorization', 'Bearer ' + token)

        expect(getResponse.statusCode).toEqual(200)

    })


    test('should get an author for authorized user', async () => {
        const postResponse = await supertest(app)
            .post('/login')
            .send({ email: fakeUserData.email, password: fakeUserData.password })

        token = postResponse.body.accessToken

        const getResponse = await supertest(app)
            .get("/authors/author1")
            .set("Authorization", `Bearer ${token}`)

        expect(getResponse.statusCode).toEqual(200)
    })

    test('should get all authors book for an authorized user', async () => {
        const postResponse = await supertest(app)
            .post('/login')
            .send({ email: fakeUserData.email, password: fakeUserData.password })

        token = postResponse.body.accessToken

        const getResponse = await supertest(app)
            .get("/books/author1?page=1&limit=4")
            .set("Authorization", `Bearer ${token}`)

        expect(getResponse.statusCode).toEqual(200)
    })

    test('should get an authors book for an authorized user', async () => {
        const postResponse = await supertest(app)
            .post('/login')
            .send({ email: fakeUserData.email, password: fakeUserData.password })

        token = postResponse.body.accessToken

        const getResponse = await supertest(app)
            .get("/books/author1/book1")
            .set("Authorization", `Bearer ${token}`)

        expect(getResponse.statusCode).toEqual(200)
    })

})

describe('POST AUTHORS & BOOKS', () => {
    test('should return 201 author created successfully', async () => {
        const response = await supertest(app)
            .post('/authors')
            .set("Authorization", `Bearer ${token}`)
            .send(fakeAuthorData)
        authorID = response.body.data.author.authorId
        expect(response.statusCode).toBe(200)
    }),
        test('should return 201 post book successfully', async () => {
            const response = await supertest(app)
                .post(`/books/${authorID}`)
                .set("Authorization", `Bearer ${token}`)
                .send(fakeBookData)

            bookID = response.body.data[0].bookId


            expect(response.statusCode).toBe(200)
        })


})


describe('DELETE AUTHORS & AUTHOR BOOKS', () => {
    test('should delete author book successfully', async () => {
        const response = await supertest(app)
            .delete(`/books/${authorID}/${bookID}`)
            .set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
    })

    test('should delete author with  OK status', async () => {
        const response = await supertest(app)
            .delete(`/authors/${authorID}`)
            .set("Authorization", `Bearer ${token}`)


        expect(response.statusCode).toBe(200)
    })


})

afterAll(() => mongoose.disconnect());
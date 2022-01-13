import Book from "../models/book.model"
import { fakeBookData } from '../db/fixtures';
import { validateNotEmpty, validateStringEquality, validateMongoDuplicationError } from "../utils/validators.utils";
import { dbConnect, dbDisconnect } from "../utils/dbHandler.utils"


beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('Book Model Test Suite', () => {
    test('should validate saving a new book successfully', async () => {
        const validAuthor = new Book({
            ...fakeBookData
        });
        const savedUser = await validAuthor.save();

        validateNotEmpty(savedUser);

        validateStringEquality(savedUser.bookId, fakeBookData.bookId);
        validateStringEquality(savedUser.authorId, fakeBookData.authorId);
        validateStringEquality(savedUser.name, fakeBookData.name);
        validateStringEquality(savedUser.isPublished, fakeBookData.isPublished);
        validateStringEquality(savedUser.serialNumber, fakeBookData.serialNumber);
        validateStringEquality(
            savedUser.datePublished,
            fakeBookData.datePublished
        );

    });

    test('should validate MongoError duplicate error with code 11000', async () => {
        expect.assertions(4);
        const validAuthor = new Book({
            ...fakeBookData
        });

        try {
            await validAuthor.save();
        } catch (error: any) {
            const { name, code } = error;
            validateMongoDuplicationError(name, code);
        }
    });
});



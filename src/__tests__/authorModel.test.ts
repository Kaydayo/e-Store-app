import Author from "../models/authors.model"
import { fakeAuthorData } from '../db/fixtures';
import { validateNotEmpty, validateStringEquality, validateMongoDuplicationError } from "../utils/validators.utils";
import { dbConnect, dbDisconnect } from "../utils/dbHandler.utils"


beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('Author Model Test Suite', () => {
    test('should validate saving a new author successfully', async () => {
        const validAuthor = new Author({
            ...fakeAuthorData
        });
        const savedUser = await validAuthor.save();

        validateNotEmpty(savedUser);

        validateStringEquality(savedUser.author, fakeAuthorData.author);
        validateStringEquality(savedUser.age, fakeAuthorData.age);
        validateStringEquality(
            savedUser.address,
            fakeAuthorData.address
        );

    });

    test('should validate MongoError duplicate error with code 11000', async () => {
        expect.assertions(4);
        const validAuthor = new Author({
            ...fakeAuthorData
        });

        try {
            await validAuthor.save();
        } catch (error: any) {
            const { name, code } = error;
            validateMongoDuplicationError(name, code);
        }
    });
});



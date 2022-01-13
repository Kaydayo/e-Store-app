import User from "../models/users.model"
import { fakeUserData } from '../db/fixtures';
import { validateNotEmpty, validateStringEquality, validateMongoDuplicationError } from "../utils/validators.utils";
import { dbConnect, dbDisconnect } from "../utils/dbHandler.utils"


beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('User Model Test Suite', () => {
    test('should validate saving a new user successfully', async () => {
        const validStudentUser = new User({
            ...fakeUserData
        });
        const savedUser = await validStudentUser.save();

        validateNotEmpty(savedUser);

        validateStringEquality(savedUser.firstName, fakeUserData.firstName);
        validateStringEquality(savedUser.email, fakeUserData.email);
        validateStringEquality(
            savedUser.lastName,
            fakeUserData.lastName
        );
        validateStringEquality(
            savedUser.phoneNumber,
            fakeUserData.phoneNumber
        );
        validateStringEquality(
            savedUser.firstName,
            fakeUserData.firstName
        );

    });

    test('should validate MongoError duplicate error with code 11000', async () => {
        expect.assertions(4);
        const validStudentUser = new User({
            ...fakeUserData
        });

        try {
            await validStudentUser.save();
        } catch (error: any) {
            const { name, code } = error;
            validateMongoDuplicationError(name, code);
        }
    });
});



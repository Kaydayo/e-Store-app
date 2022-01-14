"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeBookData = exports.fakeAuthorData = exports.fakeUserData = void 0;
exports.fakeUserData = {
    firstName: 'Dummy',
    lastName: 'User',
    email: 'dummy@user.com',
    password: '********',
    DOB: '11-02-1997',
    phoneNumber: "2348188441180"
};
exports.fakeAuthorData = {
    authorId: "author1",
    author: "John Doe",
    age: 28,
    address: "5, Wall Street, Buckingham"
};
exports.fakeBookData = {
    bookId: "book1",
    authorId: "author1",
    name: "Tomorrow is coming",
    isPublished: true,
    datePublished: 1637159508581,
    serialNumber: 10
};

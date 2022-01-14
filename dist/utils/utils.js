"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegisteration = exports.validateBooks = exports.validateEntry = void 0;
var joi_1 = __importDefault(require("joi"));
var validateEntry = function (data) {
    var schema = joi_1.default.object({
        authorId: joi_1.default.string(),
        author: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        address: joi_1.default.string().required(),
        createdAt: joi_1.default.string(),
        updatedAt: joi_1.default.string()
    }).unknown();
    return schema.validate(data);
};
exports.validateEntry = validateEntry;
var validateBooks = function (data) {
    var schema = joi_1.default.object({
        authorId: joi_1.default.string(),
        name: joi_1.default.string().required(),
        isPublished: joi_1.default.boolean().required(),
        datePublished: joi_1.default.number().required(),
        serialNumber: joi_1.default.number().required(),
        createdAt: joi_1.default.string(),
        updatedAt: joi_1.default.string()
    }).unknown();
    return schema.validate(data);
};
exports.validateBooks = validateBooks;
var validateRegisteration = function (data) {
    var schema = joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).required(),
        DOB: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        phoneNumber: joi_1.default.string().required()
    }).unknown();
    return schema.validate(data);
};
exports.validateRegisteration = validateRegisteration;
var validateLogin = function (data) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required()
    });
    return schema.validate(data);
};
exports.validateLogin = validateLogin;

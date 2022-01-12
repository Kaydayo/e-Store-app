"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var AuthorSchema = new mongoose_1.default.Schema({
    authorId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Authors', AuthorSchema);

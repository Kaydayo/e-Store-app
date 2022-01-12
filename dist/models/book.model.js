"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var BookSchema = new mongoose_1.default.Schema({
    authorId: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    },
    datePublished: {
        type: Number,
        required: true
    },
    serialNumber: {
        type: Number,
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Books', BookSchema);

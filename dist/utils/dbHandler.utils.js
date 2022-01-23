"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectTestDB = exports.connectDB = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongodb_memory_server_1 = require("mongodb-memory-server");
var connectDB = function () {
    try {
        mongoose_1.default.connect(process.env.MONGODB_URI).then(function () {
            console.log("Connected to DB");
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDB = connectDB;
var connectTestDB = function () {
    try {
        mongodb_memory_server_1.MongoMemoryServer.create().then(function (mongo) {
            var uri = mongo.getUri();
            mongoose_1.default.connect(uri).then(function () {
                //console.log("connected to testDB");
            });
        });
    }
    catch (error) {
        //console.log(error);
    }
};
exports.connectTestDB = connectTestDB;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var isAuth = function (req, res, next) {
    var authorization = req.headers['authorization'];
    var token = authorization && authorization.split(' ')[1];
    if (token == null)
        return res.status(401).json({ message: 'you need to login' });
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err) {
            return res.status(403);
        }
        req.user = user;
        next();
    });
};
exports.isAuth = isAuth;

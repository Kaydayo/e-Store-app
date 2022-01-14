"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutAuthor = exports.registerAuthor = exports.loginAuthor = exports.updateBook = exports.getAllBooks = exports.getABook = exports.deleteBook = exports.postBook = exports.deleteAuthor = exports.updateAuthor = exports.postAuthors = exports.getAuthor = exports.getAllAuthors = void 0;
var utils_1 = require("../utils/utils");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var book_model_1 = __importDefault(require("../models/book.model"));
var authors_model_1 = __importDefault(require("../models/authors.model"));
var users_model_1 = __importDefault(require("../models/users.model"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const control = express()
var getAllAuthors = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        try {
            result = res.paginatedResults;
            res.status(200).json({ message: 'successful', result: result });
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Not Found');
        }
        return [2 /*return*/];
    });
}); };
exports.getAllAuthors = getAllAuthors;
var getAuthor = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var author, reg, id, idArr, idNum, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, authors_model_1.default.findOne({ authorId: req.params.id })]; //.select('-password');
            case 1:
                author = _a.sent() //.select('-password');
                ;
                if (!author) {
                    throw new Error("No user with id : ".concat(req.params.id));
                }
                console.log(author);
                reg = /[a-z]/g;
                id = author.authorId;
                idArr = id.split(reg);
                idNum = parseInt(idArr[idArr.length - 1]);
                res.status(200).json({ next: idNum + 1, previous: idNum - 1, data: [author] });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(400).json({ message: "Author Not Found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAuthor = getAuthor;
var postAuthors = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, authorL, authorId, lastAuthor, reg, regArr, regNum, newData, author, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = (0, utils_1.validateEntry)(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).send(error.details[0].message)];
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, authors_model_1.default.find().sort({ _id: -1 }).limit(1)];
            case 2:
                authorL = _a.sent();
                console.log(authorL);
                authorId = void 0;
                if (authorL.length === 0) {
                    authorId = 'author1';
                }
                else {
                    lastAuthor = authorL[0].authorId;
                    reg = /[a-z]/g;
                    regArr = lastAuthor.split(reg);
                    regNum = regArr[regArr.length - 1];
                    authorId = "author".concat(parseInt(regNum) + 1);
                }
                newData = __assign({ authorId: authorId }, req.body);
                return [4 /*yield*/, authors_model_1.default.create(__assign({}, newData))];
            case 3:
                author = _a.sent();
                res.status(200).json({ message: 'successful', data: { author: author } });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                console.log(err_2);
                res.status(400).send('invalid');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postAuthors = postAuthors;
var updateAuthor = function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateData, author, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                updateData = __assign({}, req.body);
                console.log(updateData);
                return [4 /*yield*/, authors_model_1.default.findOneAndUpdate({ authorId: id }, updateData, { new: true })];
            case 2:
                author = _a.sent();
                res.status(200).json({ message: 'successful', data: { author: author } });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400).send(err_3.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateAuthor = updateAuthor;
var deleteAuthor = function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var author;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, authors_model_1.default.findOneAndDelete({ authorId: req.params.id })];
            case 1:
                author = _a.sent();
                if (!author) {
                    throw new Error("No author with id: $(req.params.id)");
                }
                return [4 /*yield*/, author.remove()];
            case 2:
                _a.sent();
                res.status(200).json({ message: 'successfully deleted author' });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteAuthor = deleteAuthor;
var postBook = function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, bookL, bookId, authorId, lastBook, reg, regArr, regNum, newData, book, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = (0, utils_1.validateBooks)(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).send(error.details[0].message)];
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, book_model_1.default.find({ authorId: req.params.id }).sort({ _id: -1 }).limit(1)];
            case 2:
                bookL = _a.sent();
                bookId = void 0;
                authorId = req.params.id;
                if (bookL.length === 0) {
                    bookId = 'book1';
                }
                else {
                    lastBook = bookL[0].bookId;
                    reg = /[a-z]/g;
                    regArr = lastBook.split(reg);
                    regNum = regArr[regArr.length - 1];
                    bookId = "book".concat(parseInt(regNum) + 1);
                }
                newData = __assign({ authorId: authorId, bookId: bookId }, req.body);
                return [4 /*yield*/, book_model_1.default.create(__assign({}, newData))];
            case 3:
                book = _a.sent();
                res.status(200).json({ message: 'successful', data: [book] });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                console.log(err_4);
                res.status(400).send('invalid');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postBook = postBook;
var deleteBook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, bookId, book, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, id = _a.id, bookId = _a.bookId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, book_model_1.default.findOneAndDelete({ authorId: id, bookId: bookId })];
            case 2:
                book = _b.sent();
                if (!book) {
                    throw new Error("No books with id ".concat(bookId));
                }
                return [4 /*yield*/, book.remove({ bookId: bookId })];
            case 3:
                _b.sent();
                res.status(200).json({ message: 'successfully deleted book' });
                return [3 /*break*/, 5];
            case 4:
                err_5 = _b.sent();
                res.status(400).json('invalid ');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteBook = deleteBook;
var getABook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var book, reg, id, idArr, idNum, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, book_model_1.default.findOne({ authorId: req.params.id, bookId: req.params.bookId })];
            case 1:
                book = _a.sent();
                if (!book) {
                    throw new Error("No book found ");
                }
                reg = /[a-z]/g;
                id = book.bookId;
                idArr = id.split(reg);
                idNum = parseInt(idArr[idArr.length - 1]);
                res.status(200).json({ next: idNum + 1, previous: idNum - 1, data: [book] });
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                console.log(err_6);
                res.status(400).json({ message: "Book Not Found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getABook = getABook;
var getAllBooks = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        try {
            result = res.paginatedResults;
            res.status(200).json({ message: 'successful', result: result });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
        return [2 /*return*/];
    });
}); };
exports.getAllBooks = getAllBooks;
var updateBook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updateData, book, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                updateData = __assign({}, req.body);
                return [4 /*yield*/, book_model_1.default.findOneAndUpdate({ authorId: req.params.id, bookId: req.params.bookId }, updateData, { new: true })];
            case 1:
                book = _a.sent();
                res.status(200).json({ message: 'successful', data: { book: book } });
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(400).json({ message: 'author has no book' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateBook = updateBook;
var loginAuthor = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, email, user, findUser, match, accessToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = (0, utils_1.validateLogin)(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).send(error.details[0].message)];
            case 1:
                _a.trys.push([1, 4, , 5]);
                email = req.body.email;
                user = { email: email };
                return [4 /*yield*/, users_model_1.default.findOne({ email: req.body.email })];
            case 2:
                findUser = _a.sent();
                if (!findUser)
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid login credentials' })];
                return [4 /*yield*/, bcryptjs_1.default.compare(req.body.password, findUser.password)];
            case 3:
                match = _a.sent();
                if (!match)
                    return [2 /*return*/, res.status(400).json({ message: 'invalid login credentials' })];
                accessToken = jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.status(201).json({ message: 'successful', accessToken: accessToken });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(401).send('invalid, user not found');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginAuthor = loginAuthor;
var registerAuthor = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, userAlreadyExists, newData, newUser, accessToken, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = (0, utils_1.validateRegisteration)(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).send(error.details[0].message)];
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, users_model_1.default.findOne({ email: req.body.email })];
            case 2:
                userAlreadyExists = _a.sent();
                if (userAlreadyExists)
                    return [2 /*return*/, res.status(403).json({ message: 'Email already exists' })];
                newData = __assign({}, req.body);
                return [4 /*yield*/, users_model_1.default.create(__assign({}, newData))];
            case 3:
                newUser = _a.sent();
                accessToken = jsonwebtoken_1.default.sign(newUser.email, process.env.ACCESS_TOKEN_SECRET);
                res.status(200).json({ message: 'signup successful', accessToken: accessToken });
                return [3 /*break*/, 5];
            case 4:
                err_8 = _a.sent();
                res.status(400).json({ error: "".concat(err_8.message) });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerAuthor = registerAuthor;
var logoutAuthor = function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).json({ accessToken: null });
        return [2 /*return*/];
    });
}); };
exports.logoutAuthor = logoutAuthor;

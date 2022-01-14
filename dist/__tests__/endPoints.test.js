"use strict";
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
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var fixtures_1 = require("../db/fixtures");
var fakeAuthorData = {
    author: "John Doe",
    age: 28,
    address: "5, Wall Street, Buckingham"
};
var fakeBookData = {
    name: "Tomorrow is coming",
    isPublished: true,
    datePublished: 1637159508581,
    serialNumber: 10
};
var token;
var authorID;
var bookID;
describe('AUTHORIZATION & AUTHENTICATION', function () {
    test('register a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .post("/register")
                            .send(fixtures_1.fakeUserData)];
                case 1:
                    response_1 = _a.sent();
                    expect(response_1.body.statusCode).toBe(200);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    test('should require authorization for getAllAuthors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response_2, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get('/authors')];
                case 1:
                    response_2 = _a.sent();
                    expect(response_2.statusCode).toBe(401);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    test('should require authorization for getAuthor', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response_3, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get('/authors/author1')];
                case 1:
                    response_3 = _a.sent();
                    expect(response_3.statusCode).toEqual(401);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
describe('GET AUTHORS & BOOKS', function () {
    test('should getAllAuthors for authorized user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postResponse, getResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post('/login')
                        .send({ email: fixtures_1.fakeUserData.email, password: fixtures_1.fakeUserData.password })];
                case 1:
                    postResponse = _a.sent();
                    token = postResponse.body.accessToken;
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get("/authors?page=1&limit=5")
                            .set('Authorization', 'Bearer ' + token)];
                case 2:
                    getResponse = _a.sent();
                    expect(getResponse.statusCode).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should get an author for authorized user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postResponse, getResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post('/login')
                        .send({ email: fixtures_1.fakeUserData.email, password: fixtures_1.fakeUserData.password })];
                case 1:
                    postResponse = _a.sent();
                    token = postResponse.body.accessToken;
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get("/authors/author1")
                            .set("Authorization", "Bearer ".concat(token))];
                case 2:
                    getResponse = _a.sent();
                    expect(getResponse.statusCode).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should get all authors book for an authorized user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postResponse, getResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post('/login')
                        .send({ email: fixtures_1.fakeUserData.email, password: fixtures_1.fakeUserData.password })];
                case 1:
                    postResponse = _a.sent();
                    token = postResponse.body.accessToken;
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get("/books/author1?page=1&limit=4")
                            .set("Authorization", "Bearer ".concat(token))];
                case 2:
                    getResponse = _a.sent();
                    expect(getResponse.statusCode).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should get an authors book for an authorized user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postResponse, getResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post('/login')
                        .send({ email: fixtures_1.fakeUserData.email, password: fixtures_1.fakeUserData.password })];
                case 1:
                    postResponse = _a.sent();
                    token = postResponse.body.accessToken;
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get("/books/author1/book1")
                            .set("Authorization", "Bearer ".concat(token))];
                case 2:
                    getResponse = _a.sent();
                    expect(getResponse.statusCode).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('POST AUTHORS & BOOKS', function () {
    test('should return 201 author created successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post('/authors')
                        .set("Authorization", "Bearer ".concat(token))
                        .send(fakeAuthorData)];
                case 1:
                    response = _a.sent();
                    authorID = response.body.data.author.authorId;
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); }),
        test('should return 201 post book successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .post("/books/".concat(authorID))
                            .set("Authorization", "Bearer ".concat(token))
                            .send(fakeBookData)];
                    case 1:
                        response = _a.sent();
                        bookID = response.body.data[0].bookId;
                        expect(response.statusCode).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
});
describe('DELETE AUTHORS & AUTHOR BOOKS', function () {
    test('should delete author book successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .delete("/books/".concat(authorID, "/").concat(bookID))
                        .set("Authorization", "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should delete author with  OK status', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .delete("/authors/".concat(authorID))
                        .set("Authorization", "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});

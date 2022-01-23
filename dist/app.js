"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var authors_1 = __importDefault(require("./routes/authors"));
var cors_1 = __importDefault(require("cors"));
require("dotenv/config");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var dbHandler_utils_1 = require("./utils/dbHandler.utils");
exports.app = (0, express_1.default)();
exports.app.set('views', path_1.default.join(__dirname, '../views'));
exports.app.set('view engine', 'jade');
exports.app.use((0, cors_1.default)());
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.app.use('/', authors_1.default);
// catch 404 and forward to error handler
exports.app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
exports.app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
if (process.env.NODE_ENV == 'test') {
    (0, dbHandler_utils_1.connectTestDB)();
}
else {
    (0, dbHandler_utils_1.connectDB)();
}
exports.default = exports.app;

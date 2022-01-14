"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMongoDuplicationError = exports.validateStringEquality = exports.validateNotEmpty = void 0;
var validateNotEmpty = function (received) {
    expect(received).not.toBeNull();
    expect(received).not.toBeUndefined();
    expect(received).toBeTruthy();
};
exports.validateNotEmpty = validateNotEmpty;
var validateStringEquality = function (received, expected) {
    expect(received).not.toEqual('dummydfasfsdfsdfasdsd');
    expect(received).toEqual(expected);
};
exports.validateStringEquality = validateStringEquality;
// export const retrieviedPassword = (recievied: string, expected:string)=>{
//     return bcrypt.compare()
// }
var validateMongoDuplicationError = function (name, code) {
    expect(name).not.toEqual(/dummy/i);
    expect(name).toEqual('MongoServerError');
    expect(code).not.toBe(255);
    expect(code).toBe(11000);
};
exports.validateMongoDuplicationError = validateMongoDuplicationError;

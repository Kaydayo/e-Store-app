export const validateNotEmpty = (received: string) => {
    expect(received).not.toBeNull();
    expect(received).not.toBeUndefined();
    expect(received).toBeTruthy();
};


export const validateStringEquality = (received: string | number | boolean, expected: string | number | boolean) => {
    expect(received).not.toEqual('dummydfasfsdfsdfasdsd');
    expect(received).toEqual(expected);
};

// export const retrieviedPassword = (recievied: string, expected:string)=>{
//     return bcrypt.compare()
// }

export const validateMongoDuplicationError = (name: string, code: number) => {
    expect(name).not.toEqual(/dummy/i);
    expect(name).toEqual('MongoServerError');
    expect(code).not.toBe(255);
    expect(code).toBe(11000);
};
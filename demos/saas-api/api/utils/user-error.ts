export enum ErrorCodes {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
    USER_ALREADY_A_MEMBER = 'USER_ALREADY_A_MEMBER',
    USER_ALREADY_INVITED = 'USER_ALREADY_INVITED',
    WRONG_CREDENTIALS = 'WRONG_CREDENTIALS',
    WRONG_OLD_PASSWORD = 'WRONG_OLD_PASSWORD',
}

export class UserError {
    private _code: string;
    private _message: string;
    constructor(code: ErrorCodes, message: string) {
        this._code = code;
        this._message = message;
    }
    public get code(): string {
        return this._code;
    }
    public get message(): string {
        return this._message;
    }
    public toString(): string {
        return `Error ${this.code}: ${this.message}`;
    }
}

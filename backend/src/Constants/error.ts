export class BadRequstError extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}

export class UnAuthorizedError extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.status = 401;
    }
}


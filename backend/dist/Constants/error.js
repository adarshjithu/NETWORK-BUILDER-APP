"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedError = exports.BadRequstError = void 0;
class BadRequstError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}
exports.BadRequstError = BadRequstError;
class UnAuthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
exports.UnAuthorizedError = UnAuthorizedError;

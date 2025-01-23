"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const token_1 = require("../Utils/token");
const error_1 = require("../Constants/error");
const authenticate = (req, res, next) => {
    const accessToken = req.cookies["network-access_token"];
    const refreshToken = req.cookies["network-refresh_token"];
    const refreshTokenValid = (0, token_1.verifyRefreshToken)(refreshToken);
    if (!refreshToken || !refreshTokenValid) {
        throw new error_1.UnAuthorizedError("Refresh Token Expired");
    }
    const accessTokenValid = (0, token_1.verifyToken)(accessToken);
    if (!accessToken || !accessTokenValid) {
        throw new error_1.UnAuthorizedError("Access Token Expired");
    }
    req.userId = refreshTokenValid === null || refreshTokenValid === void 0 ? void 0 : refreshTokenValid.data;
    next();
};
exports.authenticate = authenticate;

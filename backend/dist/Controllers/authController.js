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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const userModel_1 = require("../Models/userModel");
const error_1 = require("../Constants/error");
const token_1 = require("../Utils/token");
const statusCodes_1 = require("../Constants/statusCodes");
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = statusCodes_1.STATUS_CODES;
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    // @desc   User Registration
    // @route  Post auth/register
    // @access User
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.authService.registerUser(req.body);
                const accessTokenMaxAge = 1000 * 60 * 5;
                const refreshTokenMaxAge = 1000 * 60 * 60 * 48;
                res.cookie("network-access_token", response.accessToken, {
                    maxAge: accessTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    // Prevent JavaScript access to the cookie
                });
                res.cookie("network-refresh_token", response.refreshToken, {
                    maxAge: refreshTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    // Prevent JavaScript access to the cookie
                });
                res.status(OK).json({ success: true, message: "User Registration successfull", user: response === null || response === void 0 ? void 0 : response.user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   User Login
    // @route  Post auth/login
    // @access User
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.authService.loginUser(req.body);
                const accessTokenMaxAge = 1000 * 60 * 5;
                const refreshTokenMaxAge = 1000 * 60 * 60 * 48;
                res.cookie("network-access_token", response.accessToken, {
                    maxAge: accessTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    // Prevent JavaScript access to the cookie
                });
                res.cookie("network-refresh_token", response.refreshToken, {
                    maxAge: refreshTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    // Prevent JavaScript access to the cookie
                });
                res.status(OK).json({ success: true, message: "User Registration successfull", user: response === null || response === void 0 ? void 0 : response.user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   Refresh access token
    // @route  Post auth/refresh_token
    // @access User
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("refresh token call");
                const refreshToken = req.cookies["network-refresh_token"];
                const refreshTokenValid = (0, token_1.verifyRefreshToken)(refreshToken);
                if (!refreshToken || !refreshTokenValid)
                    throw new error_1.UnAuthorizedError("Refresh Token Expired");
                const userId = refreshTokenValid.data;
                const user = yield userModel_1.User.findOne({ _id: userId });
                if (!user) {
                    throw new error_1.UnAuthorizedError("Refresh Token Expired");
                }
                const newAccessToken = (0, token_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id);
                const accessTokenMaxAge = 1000 * 60 * 5;
                res.cookie("network-access_token", newAccessToken, {
                    maxAge: accessTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                })
                    .status(OK)
                    .json({ success: true, accessToken: newAccessToken });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   User logout
    // @route  Post auth/logout
    // @access User
    logoutUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("network-access_token", "", {
                    maxAge: 0, // Expire immediately
                    httpOnly: true, // Same as set
                    secure: true, // Same as set, especially for production (HTTPS)
                    sameSite: "none", // Same as set
                });
                // Clearing the refresh token cookie
                res.cookie("network-refresh_token", "", {
                    maxAge: 0, // Expire immediately
                    httpOnly: true, // Same as set
                    secure: true, // Same as set
                    sameSite: "none", // Same as set
                });
                // Responding with a success message
                res.status(200).json({ success: true, message: "User logout successful" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;

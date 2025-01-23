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
exports.AuthService = void 0;
const error_1 = require("../Constants/error");
const password_1 = require("../Utils/password");
const token_1 = require("../Utils/token");
const mailer_1 = require("../Utils/mailer");
class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check user already exists
                const user = yield this.authRepository.findUserByEmail(userData === null || userData === void 0 ? void 0 : userData.email);
                if (user)
                    throw new error_1.BadRequstError("User Already Exists");
                // Hash the user password
                const hashedPassword = yield (0, password_1.hashPassword)(userData === null || userData === void 0 ? void 0 : userData.password);
                userData.password = hashedPassword;
                // Remove confirm password before saving
                userData === null || userData === void 0 ? true : delete userData.confirmPassword;
                // Save the user to the database
                const savedUser = yield this.authRepository.createUser(userData);
                const accessToken = (0, token_1.generateAccessToken)(savedUser === null || savedUser === void 0 ? void 0 : savedUser._id);
                const refreshToken = (0, token_1.generateRefreshToken)(savedUser === null || savedUser === void 0 ? void 0 : savedUser._id);
                return { user: savedUser, accessToken, refreshToken };
            }
            catch (err) {
                console.log("Error in user registration");
                throw err;
            }
        });
    }
    forgetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authRepository.findUserByEmail(email);
                if (!user)
                    throw new error_1.BadRequstError("User not found please enter a valid email");
                const forgetToken = (0, token_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id);
                const link = `${process.env.FRONTEND_URL}/reset-password/${forgetToken}`;
                const isLinkSend = yield (0, mailer_1.sendLinkToEmail)(email, link);
                if (!isLinkSend)
                    throw new error_1.BadRequstError("Failed to send link to your email try again..");
                return { success: true };
            }
            catch (err) {
                console.log("Error in user login");
                throw err;
            }
        });
    }
    loginUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check user exist or not
                const user = yield this.authRepository.findUserByEmail(userData === null || userData === void 0 ? void 0 : userData.email);
                if (!user) {
                    throw new error_1.BadRequstError("No valid user found with this email");
                }
                // Check password valid or not
                const isPasswordValid = yield (0, password_1.comparePassword)(userData === null || userData === void 0 ? void 0 : userData.password, user === null || user === void 0 ? void 0 : user.password);
                if (!isPasswordValid) {
                    throw new error_1.BadRequstError("Entered password is invalid ");
                }
                const accessToken = (0, token_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id);
                const refreshToken = (0, token_1.generateRefreshToken)(user === null || user === void 0 ? void 0 : user._id);
                delete user["password"];
                return { user: user, accessToken, refreshToken };
            }
            catch (err) {
                console.log("Error in user login");
                throw err;
            }
        });
    }
    verifyForgetPasswordToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValid = (0, token_1.verifyToken)(token);
                if (!isValid) {
                    return { success: false, message: "The link is expired please try again" };
                }
                const user = yield this.authRepository.findUserById(isValid === null || isValid === void 0 ? void 0 : isValid.data);
                if (!user)
                    return { success: false, message: "Invalid User" };
                return { success: true };
            }
            catch (err) {
                console.log("Error in user login");
                throw err;
            }
        });
    }
    updatePassword(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (0, token_1.verifyToken)(formData.token);
                console.log(token, formData === null || formData === void 0 ? void 0 : formData.token);
                if (!token) {
                    return { success: false, message: "Link expired" };
                }
                const user = yield this.authRepository.findUserById(token === null || token === void 0 ? void 0 : token.data);
                if (!user)
                    return { success: false, message: "User not found" };
                const isSamePassword = yield (0, password_1.comparePassword)(formData === null || formData === void 0 ? void 0 : formData.password, user === null || user === void 0 ? void 0 : user.password);
                if (isSamePassword)
                    throw new error_1.BadRequstError("Enter a password which is not your old password");
                const newHashedPassword = yield (0, password_1.hashPassword)(formData === null || formData === void 0 ? void 0 : formData.password);
                yield this.authRepository.updatePassword(user === null || user === void 0 ? void 0 : user._id, newHashedPassword);
                return { success: true, message: "Your password has been updated successfully" };
            }
            catch (err) {
                console.log("Error in user login");
                throw err;
            }
        });
    }
}
exports.AuthService = AuthService;

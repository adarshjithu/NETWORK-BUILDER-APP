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
                delete user['password'];
                return { user: user, accessToken, refreshToken };
            }
            catch (err) {
                console.log("Error in user login");
                throw err;
            }
        });
    }
}
exports.AuthService = AuthService;

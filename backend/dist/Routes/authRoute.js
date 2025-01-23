"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRepository_1 = require("../Repositories/authRepository");
const authService_1 = require("../Services/authService");
const authController_1 = require("../Controllers/authController");
const authRouter = express_1.default.Router();
const authRepository = new authRepository_1.AuthRepository();
const authService = new authService_1.AuthService(authRepository);
const controller = new authController_1.AuthController(authService);
authRouter.post('/register', (req, res, next) => controller.registerUser(req, res, next));
authRouter.post('/login', (req, res, next) => controller.loginUser(req, res, next));
authRouter.get('/refresh_token', (req, res, next) => controller.refreshToken(req, res, next));
authRouter.get('/logout', (req, res, next) => controller.logoutUser(req, res, next));
exports.default = authRouter;

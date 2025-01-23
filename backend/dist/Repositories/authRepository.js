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
exports.AuthRepository = void 0;
const userModel_1 = require("../Models/userModel");
class AuthRepository {
    constructor() { }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.User.findOne({ email: email }).lean();
            }
            catch (error) {
                throw error;
            }
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new userModel_1.User(userData);
                yield newUser.save();
                return newUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AuthRepository = AuthRepository;

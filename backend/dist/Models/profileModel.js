"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    companyname: { type: String },
    industry: { type: String, required: true, },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    website: { type: String },
    dob: { type: String },
    socialmedialinks: { type: Object },
    googlemappins: { type: String, },
    emergencynumber: { type: String },
    joiningdate: { type: String },
    renewaldate: { type: String },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
exports.Profile = mongoose_1.default.model('Profile', profileSchema);

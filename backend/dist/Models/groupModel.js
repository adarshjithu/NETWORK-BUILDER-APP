"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    groupname: { type: String, require: true },
    groupdescription: { type: String, require: true },
    admin: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    private: { type: Boolean, default: false },
    pinnedmessage: { type: String },
    members: [{ type: mongoose_1.default.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
exports.Group = mongoose_1.default.model("Group", groupSchema);

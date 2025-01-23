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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const groupModel_1 = require("../Models/groupModel");
const messageModel_1 = __importDefault(require("../Models/messageModel"));
class ChatRepository {
    saveGroup(groupInfo, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupObj = Object.assign(Object.assign({}, groupInfo), { admin: userId, private: false, pinnedmessage: "", members: [userId] });
                const newGroupObj = new groupModel_1.Group(groupObj);
                yield newGroupObj.save();
                return newGroupObj;
            }
            catch (err) {
                throw err;
            }
        });
    }
    findGroupsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield groupModel_1.Group.find({ members: { $in: [new mongoose_1.default.Types.ObjectId(userId)] } }).sort({ _id: -1 });
            }
            catch (err) {
                throw err;
            }
        });
    }
    findGroupsByQuery(query, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield groupModel_1.Group.aggregate([
                    {
                        $match: {
                            $and: [{ groupname: { $regex: query, $options: "i" } }, { members: { $nin: [new mongoose_1.default.Types.ObjectId(userId)] } }],
                        },
                    },
                    {
                        $addFields: {
                            newMember: {
                                $cond: {
                                    if: { $in: [new mongoose_1.default.Types.ObjectId(userId), "$members"] },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                    },
                ]);
                console.log(res);
                return res;
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateGroupMember(groupId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield groupModel_1.Group.updateOne({ _id: groupId }, { $push: { members: userId } });
                return yield messageModel_1.default.find({ groupId: groupId }).populate({ path: "senderId", select: "name" });
            }
            catch (err) {
                throw err;
            }
        });
    }
    findMessagesByGroupId(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield messageModel_1.default.find({ groupId: groupId }).populate({ path: "senderId", select: "name" });
                console.log(res);
                return res;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.ChatRepository = ChatRepository;

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
exports.ChatService = void 0;
class ChatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    createGroup(groupInfo, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.chatRepository.saveGroup(groupInfo, userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getGroupsForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.chatRepository.findGroupsByUserId(userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    searchUser(query, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.chatRepository.findGroupsByQuery(query, userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    joinGroup(groupId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.chatRepository.updateGroupMember(groupId, userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getAllMessages(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.chatRepository.findMessagesByGroupId(groupId);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.ChatService = ChatService;

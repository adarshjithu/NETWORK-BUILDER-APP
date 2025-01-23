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
exports.ChatController = void 0;
const statusCodes_1 = require("../Constants/statusCodes");
const error_1 = require("../Constants/error");
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = statusCodes_1.STATUS_CODES;
class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    // @desc   New group creation
    // @route  Put chat/group
    // @access User
    createGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body)
                    new error_1.BadRequstError("Please provide a valid data");
                const response = yield this.chatService.createGroup(req.body, req.userId);
                res.status(OK).json({ success: true, message: "Group has been created successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get all groups for user
    // @route  Get chat/groups
    // @access User
    getAllGroups(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.chatService.getGroupsForUser(req.userId);
                res.status(OK).json({ success: true, data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Search all groups 
    // @route  Get chat/groups
    // @access User
    searchGroups(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.chatService.searchUser(req.query.query, req.userId);
                res.status(OK).json({ success: true, data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Join a group
    // @route  Get chat/group/join
    // @access User
    joinGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.chatService.joinGroup(req.body.groupId, req.userId);
                res === null || res === void 0 ? void 0 : res.status(OK).json({ success: true, message: `You are Joined successfully ${response === null || response === void 0 ? void 0 : response.groupname} `, data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   All messages in a group
    // @route  Get chat/group/messages/:groupId
    // @access User
    getAllMessages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.chatService.getAllMessages(req.params.groupId);
                console.log(response);
                res.status(OK).json({ success: true, data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.ChatController = ChatController;

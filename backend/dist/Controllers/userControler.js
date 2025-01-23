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
exports.UserController = void 0;
const statusCodes_1 = require("../Constants/statusCodes");
const error_1 = require("../Constants/error");
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = statusCodes_1.STATUS_CODES;
class UserController {
    constructor(userServices) {
        this.userServices = userServices;
    }
    // @desc   User profile creation and updation
    // @route  Put user/profile
    // @access User
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body)
                    new error_1.BadRequstError("Invalid Data");
                const response = yield this.userServices.updateProfile(req.userId, req.body);
                res.status(OK).json({ success: true, message: "Profile Updated", profile: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   Get user profile data
    // @route  Get user/profile
    // @access User
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userServices.getProfile(req.userId);
                res.status(OK).json({ success: true, data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   Delete user profile
    // @route  Delete user/profile
    // @access User
    deleteProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userServices.deleteProfile(req.userId);
                if (response === null || response === void 0 ? void 0 : response.success) {
                    res.status(OK).json({ success: true, message: "Your profile has been deleted successfully" });
                }
                else {
                    throw new error_1.BadRequstError("No profile found. There is nothing to delete");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   Create a new  event
    // @route  Post user/event
    // @access User
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userServices.createNewEvent(Object.assign(Object.assign({}, req.body), { attendees: [req.userId], userId: req.userId }));
                res === null || res === void 0 ? void 0 : res.status(OK).json({ success: true, message: "New event has been created", data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   Get all events
    // @route  Post user/events
    // @access User
    getAllEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userServices.getAllEvents(req.userId);
                res.status(OK).json({ success: true, data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc  Rsvp event
    // @route  Patch user/event
    // @access User
    rsvpEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.userServices.updateEvent(req.userId, (_a = req.body) === null || _a === void 0 ? void 0 : _a.eventId);
                console.log(response);
                res === null || res === void 0 ? void 0 : res.status(OK).json({ success: true, message: `${(response === null || response === void 0 ? void 0 : response.success) ? "RSVP Successfull" : "You are canceled the event"}` });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc  Delete event
    // @route  Patch user/event
    // @access User
    deleteEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userServices.deleteEvent(req.params.eventId);
                if ((response === null || response === void 0 ? void 0 : response.deletedCount) == 1) {
                    res.status(OK).json({ success: true, message: "Event has been successfully deleted" });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Something Went Wrong" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   Update event
    // @route  Put user/event
    // @access User
    updateEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body)
                    new error_1.BadRequstError("Invalid data");
                const response = yield this.userServices.updateEventData(req.body);
                if ((response === null || response === void 0 ? void 0 : response.modifiedCount) == 1) {
                    res.status(OK).json({ success: true, message: "The event details has been successfully updated" });
                }
                else {
                    res === null || res === void 0 ? void 0 : res.status(BAD_REQUEST).json({ success: false, messge: "Event not updated something went wrong" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;

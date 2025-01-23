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
exports.UserRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const eventModel_1 = __importDefault(require("../Models/eventModel"));
const profileModel_1 = require("../Models/profileModel");
const userModel_1 = require("../Models/userModel");
class UserRepository {
    constructor() { }
    createProfile(userId, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield profileModel_1.Profile.updateOne({ userId: userId }, { $set: profileData }, { upsert: true });
                return profileData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findProfileById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield profileModel_1.Profile.findOne({ userId: userId });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteProfileById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield profileModel_1.Profile.deleteOne({ userId: userId });
                if ((res === null || res === void 0 ? void 0 : res.deletedCount) == 0) {
                    return { success: false };
                }
                return { success: true };
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveNewEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventDate = new Date(eventData.date);
                eventDate.setHours(0, 0, 0, 0); // Set time to midnight to normalize
                eventData.date = eventDate;
                const newEvent = new eventModel_1.default(eventData);
                yield newEvent.save();
                return newEvent;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findEventsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.User.findOne({ _id: userId });
                const chapter = user === null || user === void 0 ? void 0 : user.chapter;
                const res = yield eventModel_1.default.aggregate([
                    {
                        $match: {
                            $or: [
                                { chapter: chapter },
                                { userId: new mongoose_1.default.Types.ObjectId(userId) },
                            ]
                        }
                    },
                    {
                        $match: {
                            date: { $gt: new Date() },
                        }
                    },
                    {
                        $addFields: {
                            rsvp: {
                                $in: [new mongoose_1.default.Types.ObjectId(userId), "$attendees"] // Check if userId is in the attendees array
                            }
                        }
                    }
                ]);
                return res;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateEvent(userId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(eventId);
                const objectIdUserId = new mongoose_1.default.Types.ObjectId(userId);
                const event = yield eventModel_1.default.findOne({ $and: [{ attendees: { $in: [objectIdUserId] } }, { _id: eventId }] });
                console.log(event);
                if (event) {
                    yield eventModel_1.default.updateOne({ _id: eventId }, { $pull: { attendees: objectIdUserId } });
                    return { success: false };
                }
                else {
                    yield eventModel_1.default.updateOne({ _id: eventId }, { $addToSet: { attendees: objectIdUserId } });
                    return { success: true };
                }
                return {};
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteEventById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield eventModel_1.default.deleteOne({ _id: eventId });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateEventByEventId(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield eventModel_1.default.updateOne({ _id: eventData === null || eventData === void 0 ? void 0 : eventData._id }, { $set: eventData });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;

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
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    updateProfile(userId, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.createProfile(userId, profileData);
            }
            catch (error) {
                console.log('Error while updating profile');
                throw error;
            }
        });
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findProfileById(userId);
            }
            catch (error) {
                console.log('Error while updating profile');
                throw error;
            }
        });
    }
    deleteProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.deleteProfileById(userId);
            }
            catch (error) {
                console.log('Error while updating profile');
                throw error;
            }
        });
    }
    createNewEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.saveNewEvent(eventData);
            }
            catch (error) {
                console.log('Error while updating profile');
                throw error;
            }
        });
    }
    getAllEvents(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findEventsByUserId(userId);
            }
            catch (error) {
                console.log('Error while updating profile');
                throw error;
            }
        });
    }
    updateEvent(userId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.updateEvent(userId, eventId);
            }
            catch (error) {
                console.log('Error while updating profile');
                throw error;
            }
        });
    }
    deleteEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.deleteEventById(eventId);
            }
            catch (error) {
                console.log('Error while updating profile');
                throw error;
            }
        });
    }
    updateEventData(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.userRepository.updateEventByEventId(eventData);
            }
            catch (error) {
                console.log('Error while updating profile');
                throw error;
            }
        });
    }
}
exports.UserService = UserService;

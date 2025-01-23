import mongoose from "mongoose";
import Event, { IEvent } from "../Models/eventModel";
import { IProfile, Profile } from "../Models/profileModel";
import { User } from "../Models/userModel";

export class UserRepository {
    constructor() {}

    async createProfile(userId: string, profileData: IProfile): Promise<IProfile> {
        try {
            await Profile.updateOne({ userId: userId }, { $set: profileData }, { upsert: true });
            return profileData;
        } catch (error) {
            throw error;
        }
    }
    async findProfileById(userId: string): Promise<IProfile | null> {
        try {
            return await Profile.findOne({ userId: userId });
        } catch (error) {
            throw error;
        }
    }
    async deleteProfileById(userId: string): Promise<Record<string, any>> {
        try {
            const res = await Profile.deleteOne({ userId: userId });
            if (res?.deletedCount == 0) {
                return { success: false };
            }
            return { success: true };

            
        } catch (error) {
            throw error;
        }
    }
    async saveNewEvent(eventData: IEvent): Promise<Record<string, any>> {
        try {
            const eventDate = new Date(eventData.date);
            eventDate.setHours(0, 0, 0, 0); // Set time to midnight to normalize
            eventData.date = eventDate;
            const newEvent = new Event(eventData);
            await newEvent.save();
            return newEvent;
        } catch (error) {
            throw error;
        }
    }
    async findEventsByUserId(userId: string): Promise<IEvent[]> {
        try {
            const user = await User.findOne({_id:userId})
            const chapter = user?.chapter;
            const res = await Event.aggregate([
                {
                    $match: {
                        $or: [
                            { chapter: chapter },
                            { userId: new mongoose.Types.ObjectId(userId) }, 
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
                            $in: [new mongoose.Types.ObjectId(userId), "$attendees"] // Check if userId is in the attendees array
                        }
                    }
                }
            ]);
     

            return res;
        } catch (error) {
            throw error;
        }
    }
    async updateEvent(userId: string,eventId:string): Promise<Record<string,any>> {
        try {

            console.log(eventId)
          
            const objectIdUserId = new mongoose.Types.ObjectId(userId);
            const event = await Event.findOne({$and:[{ attendees: { $in: [objectIdUserId] }},{_id:eventId}] });
            console.log(event)
            if (event) {
                await Event.updateOne({ _id: eventId }, { $pull: { attendees: objectIdUserId } });
                return { success: false };
            } else {
                await Event.updateOne({ _id: eventId }, { $addToSet: { attendees: objectIdUserId } });
                return { success: true };
            }
              return {}
            
        } catch (error) {
            throw error;
        }
    }
    async deleteEventById(eventId:string): Promise<Record<string,any>> {
        try {
            return await Event.deleteOne({_id:eventId})
         
        } catch (error) {
            throw error;
        }
    }
    async updateEventByEventId(eventData:IEvent): Promise<Record<string,any>> {
        try {
           return  await Event.updateOne({_id:eventData?._id},{$set:eventData})
            

         
        } catch (error) {
            throw error;
        }
    }
}

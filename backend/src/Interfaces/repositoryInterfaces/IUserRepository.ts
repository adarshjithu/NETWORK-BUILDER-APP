import { IEvent } from "../../Models/eventModel";
import { IProfile } from "../../Models/profileModel";

export interface IUserRepository{
    
     createProfile:(userId:string,profileData:IProfile)=>Promise<any>;
     findProfileById:(userId:string)=>Promise<any>;
     deleteProfileById:(userId:string)=>Promise<any>
     saveNewEvent:(eventData:IEvent)=>Promise<any>
     findEventsByUserId:(userId:string)=>Promise<IEvent[]>
     updateEvent:(userId:string,eventId:string)=>Promise<any>
     deleteEventById:(eventId:string)=>Promise<any>;
     updateEventByEventId:(eventData:IEvent)=>Promise<any>
}
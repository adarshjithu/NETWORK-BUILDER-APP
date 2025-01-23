import { IUserRepository } from "../Interfaces/repositoryInterfaces/IUserRepository";
import { IEvent } from "../Models/eventModel";
import { IProfile } from "../Models/profileModel";

export class UserService{
    constructor(private userRepository:IUserRepository){

    }

    async updateProfile (userId:string,profileData:IProfile):Promise<any>{
        try{
          
          return await this.userRepository.createProfile(userId,profileData)

        }catch(error){
            console.log('Error while updating profile')
            throw error
        }
        
    }
    async getProfile (userId:string):Promise<IProfile|null>{
        try{
          
          return await this.userRepository.findProfileById(userId)

        }catch(error){
            console.log('Error while updating profile')
            throw error
        }
           
    }  
    async deleteProfile (userId:string):Promise<Record<string,any>|null>{
        try{
           
          return await this.userRepository.deleteProfileById(userId)

        }catch(error){
            console.log('Error while updating profile')
            throw error
        }
        
    }
    async createNewEvent (eventData:IEvent):Promise<Record<string,any>|null>{
        try{
           
          return await this.userRepository.saveNewEvent(eventData)

        }catch(error){
            console.log('Error while updating profile')
            throw error
        }
        
    }
    async getAllEvents (userId:string):Promise<Record<string,any>|null>{
        try{
           
          return await this.userRepository.findEventsByUserId(userId)

        }catch(error){
            console.log('Error while updating profile')
            throw error
        }
        
    }
    async updateEvent (userId:string,eventId:string):Promise<Record<string,any>|null>{
        try{
           
          return await this.userRepository.updateEvent(userId,eventId)

        }catch(error){
            console.log('Error while updating profile')
            throw error
        }
        
    }
    async deleteEvent (eventId:string):Promise<Record<string,any>|null>{
        try{
           
          return await this.userRepository.deleteEventById(eventId)

        }catch(error){
            console.log('Error while updating profile')
            throw error
        }
        
    }
    async updateEventData (eventData:IEvent):Promise<Record<string,any>|null>{
        try{
           
          return this.userRepository.updateEventByEventId(eventData)

        }catch(error){
            console.log('Error while updating profile')
            throw error
        }
        
    }
}
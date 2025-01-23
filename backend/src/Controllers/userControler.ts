import { NextFunction, Request, Response } from "express";
import { UserService } from "../Services/userService";
import { STATUS_CODES } from "../Constants/statusCodes";
import { BadRequstError } from "../Constants/error";
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = STATUS_CODES;
export class UserController {
    constructor(private userServices: UserService) {}

    // @desc   User profile creation and updation
    // @route  Put user/profile
    // @access User
    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userServices.updateProfile(req.userId, req.body);
            res.status(OK).json({ success: true, message: "Profile Updated", profile: response });
        } catch (error) {
            next(error);
        }
    }

    // @desc   Get user profile data
    // @route  Get user/profile
    // @access User
    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userServices.getProfile(req.userId);
            res.status(OK).json({ success: true, data: response });
        } catch (error) {
            next(error);
        }
    }

    // @desc   Delete user profile
    // @route  Delete user/profile
    // @access User
    async deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userServices.deleteProfile(req.userId);
            if (response?.success) {
                res.status(OK).json({ success: true, message: "Your profile has been deleted successfully" });
            } else {
                throw new BadRequstError("No profile found. There is nothing to delete");
            }
        } catch (error) {
            next(error);
        }
    }
    // @desc   Create a new  event
    // @route  Post user/event
    // @access User
    async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const response =  await this.userServices.createNewEvent({...req.body,attendees:[req.userId],userId:req.userId})
          res?.status(OK).json({success:true,message:"New event has been created",data:response})
        } catch (error) {
            next(error);
        }
    }
    // @desc   Get all events
    // @route  Post user/events
    // @access User
    async getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const response =  await this.userServices.getAllEvents(req.userId)
          res.status(OK).json({success:true,data:response})
          
        } catch (error) {
            next(error);
        }
    } 
    // @desc  Rsvp event
    // @route  Patch user/event
    // @access User
    async rsvpEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userServices.updateEvent(req.userId,req.body?.eventId)
            console.log(response)
             res?.status(OK).json({success:true,message:`${response?.success?"RSVP Successfull":"You are canceled the event"}`})
        } catch (error) {
            next(error);
        }
    }
    // @desc  Delete event
    // @route  Patch user/event
    // @access User
    async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response  = await this.userServices.deleteEvent(req.params.eventId)
           if(response?.deletedCount==1){
            res.status(OK).json({success:true,message:"Event has been successfully deleted"})
           }else{
            res.status(BAD_REQUEST).json({success:false,message:"Something Went Wrong"})
           }
        } catch (error) {
            next(error);
        }
    }
    // @desc   Update event
    // @route  Put user/event
    // @access User
    async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
         
           const response = await this.userServices.updateEventData(req.body)
           if(response?.modifiedCount==1){
            res.status(OK).json({success:true,message:"The event details has been successfully updated"})
           }else{
            res?.status(BAD_REQUEST).json({success:false,messge:"Event not updated something went wrong"})
           }
        } catch (error) {
            next(error);
        }
    }

}
   


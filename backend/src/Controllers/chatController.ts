import { NextFunction ,Request,Response} from "express";
import { ChatService } from "../Services/chatService";
import { STATUS_CODES } from "../Constants/statusCodes";

const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = STATUS_CODES;
export class ChatController {
    constructor(private chatService: ChatService) {}


    
    // @desc   New group creation
    // @route  Put chat/group
    // @access User
    async createGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.chatService.createGroup(req.body,req.userId);
            res.status(OK).json({success:true,message:"Group has been created successfully",data:response})
        } catch (err) {
            next(err);
        }
    }
    // @desc   Get all groups for user
    // @route  Get chat/groups
    // @access User
    async getAllGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.chatService.getGroupsForUser(req.userId);
            
            res.status(OK).json({success:true,data:response})
        } catch (err) {
            next(err);
        }
    }
    // @desc   Search all groups 
    // @route  Get chat/groups
    // @access User
    async searchGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
         const response = await this.chatService.searchUser(req.query.query as string,req.userId)
         res.status(OK).json({success:true,data:response})
        } catch (err) {
            next(err);
        }
    }
    // @desc   Join a group
    // @route  Get chat/group/join
    // @access User
    async joinGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
         const response = await this.chatService.joinGroup(req.body.groupId as string,req.userId as string)
         
          res?.status(OK).json({success:true,message:`You are Joined successfully ${response?.groupname} `,data:response})
        } catch (err) {
            next(err);
        }
    }
    // @desc   All messages in a group
    // @route  Get chat/group/messages/:groupId
    // @access User
    async getAllMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          
         const response = await this.chatService.getAllMessages(req.params.groupId)
         console.log(response)
         res.status(OK).json({success:true,data:response})
        } catch (err) {
            next(err);
        }
    }
}

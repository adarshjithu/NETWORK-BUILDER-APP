import { IChatInterface } from "../Interfaces/repositoryInterfaces/IChatInterface";
import { IGroup } from "../Models/groupModel";

export class ChatService {
    constructor(private chatRepository: IChatInterface) {}

    async createGroup(groupInfo: { groupname: string; groupdescription: string }, userId: string): Promise<IGroup> {
        try {
            return await this.chatRepository.saveGroup(groupInfo,userId)
            
        } catch (err) {
            throw err;
        }
    }
    async getGroupsForUser( userId: string): Promise<IGroup> {
        try {
            return await this.chatRepository.findGroupsByUserId(userId)
            
        } catch (err) {
            throw err;
        }
    }
    async searchUser( query: string,userId:string): Promise<IGroup[]> {
        try {
            
            return await this.chatRepository.findGroupsByQuery(query,userId);
            
        } catch (err) {
            throw err;
        }
    }
    async joinGroup( groupId:string,userId:string): Promise<any> {
        try {
            
            return await this.chatRepository.updateGroupMember(groupId,userId)
        } catch (err) {
            throw err;
        }
    }
    async getAllMessages( groupId:string): Promise<any> {
        try {
            
            return await this.chatRepository.findMessagesByGroupId(groupId)
        } catch (err) {
            throw err;
        }
    }
}

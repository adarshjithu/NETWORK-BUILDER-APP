import { IGroup } from "../../Models/groupModel";

export interface IChatInterface{
    saveGroup:(groupData:{groupname:string,groupdescription:string},userId:string)=>Promise<any>
    findGroupsByUserId:(userId:string)=>Promise<any>
    findGroupsByQuery:(query:string,userId:string)=>Promise<any>
    updateGroupMember:(groupId:string,userId:string)=>Promise<any>
    findMessagesByGroupId:(groupId:string)=>Promise<any>
}

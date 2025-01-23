import { axiosInstance } from "./baseUrl";
import errorHandler from "./errorHandler";

export const  createNewGroup = async (data: {groupdescription:string,groupname:string}) => {
    try {
        
        const response = await axiosInstance.post("/chat/group", data);
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};
export const  getAllGroups = async () => {
    try {
        
        const response = await axiosInstance.get("/chat/groups");
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};
export const  searchGroups = async (query:string) => {
    try {
        
        const response = await axiosInstance.get(`/chat/groups/search?query=${query}`);
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};
export const  joinGroupWithId = async (groupId:string) => {
    try {
        
        const response = await axiosInstance.post(`/chat/group/join`,{groupId});
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
}; 
export const  getAllMessages = async (groupId:string) => {
    try {
       
        
        const response = await axiosInstance.get(`/chat/group/messages/${groupId}`);
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};

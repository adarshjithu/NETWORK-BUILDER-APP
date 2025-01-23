import { IEvent } from "../Interfaces/IEvent";
import { IProfile } from "../Interfaces/User";
import { axiosInstance } from "./baseUrl";
import errorHandler from "./errorHandler";

export const  updateProfile = async (data: IProfile) => {
    try {
        const response = await axiosInstance.put("/user/profile", data);
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};

export const  getProfile = async () => {
    try {
        const response = await axiosInstance.get("/user/profile");
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};
export const  deleteProfile = async () => {
    try {
        
        const response = await axiosInstance.delete("/user/profile");
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};
export const  logoutUser = async () => {
    try {
        
        const response = await axiosInstance.get("/auth/logout");
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};
export const  createEvent = async (eventData:Partial<IEvent>) => {
    try {
        
        const response = await axiosInstance.post("/user/event",eventData);
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};
export const  getAllEvents = async () => {
    try {
        
        const response = await axiosInstance.get("/user/events");
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};
export const  doRsvp = async (eventId:string) => {
    try {
        
        const response = await axiosInstance.patch("/user/event",{eventId});
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};

export const  deleteEvent = async (eventId:string) => {
    try {
        
        
        const response = await axiosInstance.delete(`/user/event/${eventId}`,);
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};
export const  updateEvent = async (formData:IEvent) => {
    try {
        
        
        const response = await axiosInstance.put(`/user/event/`,formData);
        return response;
    } catch (error) {
        console.log("error", error);
        errorHandler(error);
    }
};


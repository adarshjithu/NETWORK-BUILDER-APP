import { IUser } from "../Interfaces/User";
import { axiosInstance } from "./baseUrl";
import errorHandler from "./errorHandler";

export const createUser = async (data: IUser) => {

    try {
        const response = await axiosInstance.post("/auth/register", data);
        return response;
    } catch (error) {
        console.log('error',error)
        errorHandler(error);
    }
};

export const loginUser = async (data: IUser) => {

    try {
        const response = await axiosInstance.post("/auth/login", data);
        return response;
    } catch (error) {
        console.log('error',error)
        errorHandler(error);
    }
};
export const forgetPassword = async (email: string) => {

    try {
        const response = await axiosInstance.post("/auth/forget_password",{email});
        return response;
    } catch (error) {
        console.log('error',error)
        errorHandler(error);
    }
};
export const verifyToken = async (token: string) => {

    try {
       
        const response = await axiosInstance.post("/auth/forget_password/verify_token",{token:token});
        
         return response;
    } catch (error) {
        console.log('error',error)
        errorHandler(error);
    }
};
export const resetPassword = async (formData: {token:string,password:string,confirmpassword:string}) => {

    try {
       
        const response = await axiosInstance.post("/auth/forget_password/new_password",formData);
        
         return response;
    } catch (error) {
        console.log('error',error)
        errorHandler(error);
    }
};

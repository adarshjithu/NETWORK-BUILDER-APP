import axios from "axios";
import toast from "react-hot-toast";
import { userLogout } from "../features/authSlice";
import { store } from "../app/store";
export const baseURL = "http://localhost:3000"
export const axiosInstance = axios.create({
    baseURL:baseURL ,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Refresh access token

const refreshAccessToken = async () => {
    try {
        // Call the refresh endpoint
        const response = await axiosInstance.get("auth/refresh_token", {
            withCredentials: true, // Ensure cookies are sent
        });

        // The server should handle sending back the new access token via cookies
        return response.data.access_token; // Adjust based on your server response
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};

axiosInstance.interceptors.response.use(
    (response) => {
        if (response?.data?.message) {
            toast.success(response?.data?.message);
        }
        return response;
    },

    async (error) => {
        const message = error?.response?.data?.message;
        console.log('Message',message)
        if(error?.response?.status==500){
            location.href= '/500'
        }
        if(error?.response?.status==404){
            location.href= '/404'
        }

        if (message !== "Access Token Expired") {
            toast.error(error?.response?.data?.message);
        }

        if (error?.response?.data?.message == "Refresh Token Expired") {
            store.dispatch(userLogout());
        }

        const originalRequest = error.config;
        if (error.response?.status === 401 && error.response.data.message == "Access Token Expired" && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshAccessToken();
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                store.dispatch(userLogout());

                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

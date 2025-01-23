import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import chatReducer from '../features/chatSlice'
import eventReducer from '../features/eventSlice'

export interface RootState {
    auth:{[key:string]:any},  
    chat:{[key:string]:any},  
    event:{[key:string]:any}
}

export const store = configureStore({
    reducer: { auth: authReducer ,chat:chatReducer,event:eventReducer},
    
});

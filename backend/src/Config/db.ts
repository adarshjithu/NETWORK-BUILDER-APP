
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const connectDb = async () => {
    try {
     
        await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
        console.log("Database connected successfully")
    } catch (error:any) {
        console.log("Mongodb connection error", error.message);
    
    }
};
 
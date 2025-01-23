
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
export const generateAccessToken = (payload:mongoose.Types.ObjectId|undefined|string) => {
    const token = jwt.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN });
    return token;
};
 


export const generateRefreshToken = (payload:mongoose.Types.ObjectId|undefined|string ) => {
    const token = jwt.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
    return token;
};



export const verifyToken = (token: string):any => {
    try {
         const secret = `${process.env.JWT_SECRET}`;
         const decoded = jwt.verify(token, secret);
         return decoded;
    } catch (error: any) {
         
         console.log("Error while jwt token verification");
         
         return null
    }
};



export const verifyRefreshToken = (token: string):any => {
    try {
         const secret = `${process.env.JWT_SECRET}`;
         const decoded = jwt.verify(token, secret);
         return decoded;
    } catch (error) {
         return null;
         console.log(error as Error);
    }
};
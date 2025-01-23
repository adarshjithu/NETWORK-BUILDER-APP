import { hash } from "bcrypt";
import { BadRequstError } from "../Constants/error";
import { IAuthRepository } from "../Interfaces/repositoryInterfaces/IAuthRepository";
import { IUser } from "../Models/userModel";
import { comparePassword, hashPassword } from "../Utils/password";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../Utils/token";
import mongoose, { ObjectId } from "mongoose";
import { sendLinkToEmail } from "../Utils/mailer";

export class AuthService {
    constructor(private authRepository: IAuthRepository) {}

    async registerUser(userData: IUser): Promise<{ user: IUser; refreshToken: string; accessToken: string }> {
        try {
            // Check user already exists
            const user = await this.authRepository.findUserByEmail(userData?.email);
            if (user) throw new BadRequstError("User Already Exists");

            // Hash the user password
            const hashedPassword = await hashPassword(userData?.password as string);
            userData.password = hashedPassword;

            // Remove confirm password before saving
            delete userData?.confirmPassword;

            // Save the user to the database
            const savedUser = await this.authRepository.createUser(userData);

            const accessToken = generateAccessToken(savedUser?._id as string);
            const refreshToken = generateRefreshToken(savedUser?._id as string);

            return { user: savedUser, accessToken, refreshToken };
        } catch (err) {
            console.log("Error in user registration");
            throw err;
        }
    }

    async forgetPassword(email: string): Promise<{ success: boolean }> {
        try {
            const user = await this.authRepository.findUserByEmail(email);
            if (!user) throw new BadRequstError("User not found please enter a valid email");
            const forgetToken = generateAccessToken(user?._id);
            const link = `${process.env.FRONTEND_URL}/reset-password/${forgetToken}`;

            const isLinkSend = await sendLinkToEmail(email, link);
            if (!isLinkSend) throw new BadRequstError("Failed to send link to your email try again..");
            return { success: true };
        } catch (err) {
            console.log("Error in user login");
            throw err;
        }
    }
    async loginUser(userData: IUser): Promise<{ user: Record<string, any>; accessToken: string; refreshToken: string }> {
        try {
            // Check user exist or not
            const user = await this.authRepository.findUserByEmail(userData?.email);
            if (!user) {
                throw new BadRequstError("No valid user found with this email");
            }

            // Check password valid or not
            const isPasswordValid = await comparePassword(userData?.password, user?.password);
            if (!isPasswordValid) {
                throw new BadRequstError("Entered password is invalid ");
            }

            const accessToken = generateAccessToken(user?._id as string);
            const refreshToken = generateRefreshToken(user?._id as string);
            delete user["password"];
            return { user: user, accessToken, refreshToken };
        } catch (err) {
            console.log("Error in user login");
            throw err;
        }
    }
    async verifyForgetPasswordToken(token: string): Promise<any> {
        try {
            const isValid = verifyToken(token);

            if (!isValid) {
                return { success: false, message: "The link is expired please try again" };
            }

            const user = await this.authRepository.findUserById(isValid?.data);
            if (!user) return { success: false, message: "Invalid User" };
            return { success: true };
        } catch (err) {
            console.log("Error in user login");
            throw err;
        }
    }
    async updatePassword(formData: { password: string; confirmpassword: string; token: string }): Promise<any> {
        try {
            const token = verifyToken(formData.token);
            console.log(token,formData?.token)
            if (!token) {
                return { success: false, message: "Link expired" };
            }

            const user = await this.authRepository.findUserById(token?.data);
            if (!user) return { success: false, message: "User not found" };
            const isSamePassword = await comparePassword(formData?.password, user?.password);
            if (isSamePassword) throw new BadRequstError("Enter a password which is not your old password");
            const newHashedPassword = await hashPassword(formData?.password);
            await this.authRepository.updatePassword(user?._id as string, newHashedPassword);
            return {success:true,message:"Your password has been updated successfully"}
        } catch (err) {
            console.log("Error in user login");
            throw err;
        }
    }
}

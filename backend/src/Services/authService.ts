import { hash } from "bcrypt";
import { BadRequstError } from "../Constants/error";
import { IAuthRepository } from "../Interfaces/repositoryInterfaces/IAuthRepository";
import { IUser } from "../Models/userModel";
import { comparePassword, hashPassword } from "../Utils/password";
import { generateAccessToken, generateRefreshToken } from "../Utils/token";
import mongoose, { ObjectId } from "mongoose";

export class AuthService {
    constructor(private authRepository: IAuthRepository) {}

    async registerUser(userData: IUser): Promise<{user:IUser,refreshToken:string,accessToken:string}> {
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

    async loginUser(userData: IUser): Promise<any> {
        try {
            // Check user exist or not
            const user = await this.authRepository.findUserByEmail(userData?.email);
            if (!user) {
                throw new BadRequstError("No valid user found with this email");
            }

            // Check password valid or not
            const isPasswordValid = await comparePassword(userData?.password,user?.password)
            if(!isPasswordValid){throw new BadRequstError("Entered password is invalid ")}

            const accessToken = generateAccessToken(user?._id as string);
            const refreshToken = generateRefreshToken(user?._id as string);
            delete user['password']
            return {user:user,accessToken,refreshToken}
        } catch (err) {
            console.log("Error in user login");
            throw err;
        }
    }

}

import { BadRequstError } from "../Constants/error";
import { IUser, User } from "../Models/userModel";

export class AuthRepository {
    constructor() {}

    async findUserByEmail(email:string) :Promise<IUser|null>{
        try {
            return await User.findOne({email:email}).lean();
        } catch (error) {
            throw error
        }
    }
    async createUser(userData:IUser):Promise<IUser|null> {
        try {
            const newUser=  new User(userData);
            await newUser.save()
            return newUser;
        } catch (error) {
            throw error
        }
    }
    async findUserById(userId:string):Promise<IUser|null> {
        try {
               return User.findOne({_id:userId})
        } catch (error) {
            throw error
        }
    }
    async updatePassword(userId:string,password:string):Promise<Record<string,any>|null> {
        try {
            if(!userId) throw new BadRequstError("Invalid user")
               return User.updateOne({_id:userId},{$set:{password:password}})
        } catch (error) {
            throw error
        }
    }
  
}

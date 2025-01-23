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
  
}

import { IUser } from "../../Models/userModel";

export interface IAuthRepository {
    findUserByEmail: (email: string) => Promise<any>;
    createUser: (userData: IUser) => Promise<any>;
    findUserById:(userId:string)=>Promise<IUser|null>
    updatePassword:(userId:string,password:string)=>Promise<Record<string,any>|null>
}

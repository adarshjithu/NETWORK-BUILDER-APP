import { IUser } from "../../Models/userModel";

export interface IAuthRepository {
    findUserByEmail: (email: string) => Promise<any>;
    createUser: (userData: IUser) => Promise<any>;
}

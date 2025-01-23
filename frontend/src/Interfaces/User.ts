export interface IUser {
    email: string;
    password: string;
    confirmpassword?: string;
    name?: string;
}



export interface IProfile{
    name:string;
    companyname:string;
    industry:string;
    phone:string;
    email:string;
    website:string;
    dob:string;
    socialmedialinks:Record<string,any>;
    googlemappins:string;
    emergencynumber:string
    joiningdate:string;
    renewaldate:string
}
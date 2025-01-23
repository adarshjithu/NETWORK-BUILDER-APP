import mongoose, { Document, ObjectId } from "mongoose";

export interface IProfile extends Document{
    name:string;
    companyname:string;
    industry:string;
    phone:string|number;
    email:string;
    website:string;
    dob:string;
    socialmedialinks:Record<string,any>;
    googlemappins:string;
    emergencynumber:string
    joiningdate:string;
    renewaldate:string
    userId:ObjectId
}

const profileSchema = new mongoose.Schema<IProfile>({
name:{type:String,required:true},
companyname:{type:String},
industry:{type:String,required:true,},
phone:{type:Number,required:true},
email:{type:String,required:true},
website:{type:String},
dob:{type:String},
socialmedialinks:{type:Object},
googlemappins:{type:String,},
emergencynumber:{type:String},
joiningdate:{type:String},
renewaldate:{type:String},
userId:{type:mongoose.Types.ObjectId,ref:'User'}
},{timestamps:true})


export const Profile = mongoose.model('Profile',profileSchema);


import mongoose from "mongoose";

export interface IGroup {
    groupname: string;
    groupdescription: string;
    admin: any;
    private: boolean;
    pinnedmessage: string;
    members: string[];
    _id: any;
}

const groupSchema = new mongoose.Schema<IGroup>(
    {
        groupname: { type: String, require: true },
        groupdescription: { type: String, require: true },
        admin: { type: mongoose.Types.ObjectId, ref: "User" },
        private: { type: Boolean, default: false },
        pinnedmessage: { type: String },
        members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);

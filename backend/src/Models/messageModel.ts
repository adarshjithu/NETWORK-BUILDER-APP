import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    senderId: string;
    groupId: any;
    message: string;
    createdAt: Date;
    updatedAt?: Date;
    isRead: boolean;
    messageType: "text" | "image" | "video" | "file";
    attachments?: string[];
}

const MessageSchema: Schema = new Schema(
    {
        senderId: { type: mongoose.Types.ObjectId, ref: "User" },
        groupId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },

        isRead: { type: Boolean, default: false },
        messageType: {
            type: String,
            enum: ["text", "image", "video", "file"],
            default: "text",
        },
        attachments: [{ type: String }],
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);


const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;

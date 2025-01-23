import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    chapter: string;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        chapter: { type: String, required: true },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

export { User, IUser };

import mongoose from "mongoose";
import { Group, IGroup } from "../Models/groupModel";
import { query } from "express";
import Message, { IMessage } from "../Models/messageModel";

export class ChatRepository {
    async saveGroup(groupInfo: { groupname: string; groupdescription: string }, userId: string): Promise<IGroup> {
        try {
            const groupObj = {
                ...groupInfo,
                admin: userId,
                private: false,
                pinnedmessage: "",
                members: [userId],
            };

            const newGroupObj = new Group(groupObj);
            await newGroupObj.save();
            return newGroupObj;
        } catch (err) {
            throw err;
        }
    }
    async findGroupsByUserId(userId: string): Promise<IGroup[]> {
        try {
            return await Group.find({ members: { $in: [new mongoose.Types.ObjectId(userId)] } }).sort({ _id: -1 });
        } catch (err) {
            throw err;
        }
    }
    async findGroupsByQuery(query: string, userId: string): Promise<any> {
        try {
            const res = await Group.aggregate([
                {
                    $match: {
                        $and: [{ groupname: { $regex: query, $options: "i" } }, { members: { $nin: [new mongoose.Types.ObjectId(userId)] } }],
                    },
                },
                {
                    $addFields: {
                        newMember: {
                            $cond: {
                                if: { $in: [new mongoose.Types.ObjectId(userId), "$members"] },
                                then: false,
                                else: true,
                            },
                        },
                    },
                },
            ]);

            console.log(res);
            return res;
        } catch (err) {
            throw err;
        }
    }

    async updateGroupMember(groupId: string,userId:string): Promise<Record<string,any>> {
        try {
            await Group.updateOne({_id:groupId},{$push:{members:userId}});
            return await Message.find({groupId:groupId}).populate({path:"senderId",select:"name"})
        } catch (err) {
            throw err; 
        }
    }
    async findMessagesByGroupId(groupId: string,): Promise<IMessage[]> {
        try {
          const res  = await Message.find({groupId:groupId}).populate({path:"senderId",select:"name"})
          console.log(res)
          return res;
        } catch (err) {
            throw err;
        }
    }
}

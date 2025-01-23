import Message from "../Models/messageModel";

export const groupChat = (socket: any, io: any) => {
    const usersOneline: any = {};

    const userId = socket.handshake.auth.token;
    usersOneline[userId] = socket.id;
    socket.on("join-group", (roomId: string) => {
        socket.join(roomId);
    });

    socket.on("new_message", async (data: any) => {
        io.to(data.groupId).emit("new_message", { ...data, senderId: { _id: data?.senderId, name: data?.username } });
        await Message.create(data);
    });
};

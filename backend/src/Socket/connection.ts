
import { Server as SocketIOServer } from 'socket.io'; 
import { groupChat } from './chat';
export function connectSocketIo(server:any){
const io = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:5173",  // Replace with your frontend URL if needed
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }
});


io.on("connection", (socket) => {

    console.log("A user connected");
    groupChat(socket,io)
    // Handle specific socket events (e.g., chat messages)
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

   
});

}
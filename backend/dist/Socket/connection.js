"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSocketIo = connectSocketIo;
const socket_io_1 = require("socket.io");
const chat_1 = require("./chat");
function connectSocketIo(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173", // Replace with your frontend URL if needed
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        }
    });
    io.on("connection", (socket) => {
        console.log("A user connected");
        (0, chat_1.groupChat)(socket, io);
        // Handle specific socket events (e.g., chat messages)
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
}

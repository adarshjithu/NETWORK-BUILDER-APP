import express, { Application } from "express";
import http from "http";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from "./Routes/authRoute";
import { errorHandler } from "./Middlewares/errorHandler";
import userRoute from "./Routes/userRoutes";
import chatRoute from "./Routes/chatRoute";
 // Import the Socket.IO server
import { connectSocketIo } from "./Socket/connection";

dotenv.config();

const app: Application = express();
const server = http.createServer(app);  // Create HTTP server from the express app

connectSocketIo(server)



// Middleware for body parsing and cookies
app.use(express.json());
app.use(cookieParser());

// CORS configuration for your API routes
app.use(
    cors({
        origin: ["http://localhost:5173"],  // Adjust to your frontend
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// Routes for your app
app.use('/auth', authRouter);
app.use('/user', userRoute);
app.use('/chat', chatRoute);

// Error handler middleware
app.use(errorHandler);

// Export the server for running it elsewhere
export  {server};

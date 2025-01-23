import dotenv from "dotenv";
import { connectDb } from "./Config/db";
import { server } from "./app";

// Database Connection
connectDb();

// Env Configuration
dotenv.config();

// Server Connection
server.listen(process.env.PORT||3000, () => {
    console.log(`Server Started On ${process.env.PORT}`);
});

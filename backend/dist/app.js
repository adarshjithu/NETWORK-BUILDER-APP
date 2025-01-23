"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoute_1 = __importDefault(require("./Routes/authRoute"));
const errorHandler_1 = require("./Middlewares/errorHandler");
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const chatRoute_1 = __importDefault(require("./Routes/chatRoute"));
// Import the Socket.IO server
const connection_1 = require("./Socket/connection");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Create HTTP server from the express app
exports.server = server;
(0, connection_1.connectSocketIo)(server);
// Middleware for body parsing and cookies
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// CORS configuration for your API routes
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"], // Adjust to your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// Routes for your app
app.use('/auth', authRoute_1.default);
app.use('/user', userRoutes_1.default);
app.use('/chat', chatRoute_1.default);
// Error handler middleware
app.use(errorHandler_1.errorHandler);

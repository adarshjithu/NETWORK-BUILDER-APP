"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./Config/db");
const app_1 = require("./app");
// Database Connection
(0, db_1.connectDb)();
// Env Configuration
dotenv_1.default.config();
// Server Connection
app_1.server.listen(process.env.PORT || 3000, () => {
    console.log(`Server Started On ${process.env.PORT}`);
});

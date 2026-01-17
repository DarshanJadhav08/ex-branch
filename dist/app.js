"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const config_1 = __importDefault(require("./db/config"));
require("./model/authUser.model");
require("./model/expense.model");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, fastify_1.default)({ logger: true });
app.register(user_routes_1.default);
const start = async () => {
    await config_1.default.authenticate();
    await config_1.default.sync();
    await app.listen({
        port: Number(process.env.PORT) || 3000,
        host: "0.0.0.0",
    });
    console.log("🚀 Server started");
};
start();

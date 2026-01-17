"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const config_1 = __importDefault(require("./db/config"));
require("./model/authUser.model");
require("./model/expense.model");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, fastify_1.default)({ logger: true });
// ✅ ONLY CORS PLUGIN (ENOUGH)
app.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
});
app.register(user_routes_1.default);
const start = async () => {
    try {
        await config_1.default.authenticate();
        await config_1.default.sync();
        const port = Number(process.env.PORT) || 3000;
        await app.listen({ port, host: "0.0.0.0" });
        console.log(`🚀 Server running on port ${port}`);
    }
    catch (err) {
        console.error("❌ Server start failed", err);
        process.exit(1);
    }
};
start();

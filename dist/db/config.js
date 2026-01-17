"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDBConnection = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
    dialectOptions: process.env.NODE_ENV === "production"
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
        : {},
});
// 🔒 Safety check
const testDBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");
    }
    catch (error) {
        console.error("❌ Unable to connect to database:", error);
        process.exit(1);
    }
};
exports.testDBConnection = testDBConnection;
exports.default = sequelize;

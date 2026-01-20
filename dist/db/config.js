"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDBConnection = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const isProduction = process.env.NODE_ENV === "production";
const sequelize = new sequelize_1.Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
    dialectOptions: isProduction
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
        : {},
    pool: {
        max: 3,
        min: 0,
        acquire: 10000,
        idle: 5000,
    },
});
const testDBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");
    }
    catch (error) {
        console.error("❌ Database connection failed (will retry):", error);
    }
};
exports.testDBConnection = testDBConnection;
exports.default = sequelize;

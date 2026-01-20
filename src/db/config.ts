import "dotenv/config";
import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
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
  }
);

export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // 🔎 DEBUG: Which database & schema backend is connected to
    const [result] = await sequelize.query(
      "SELECT current_database(), current_schema();"
    );
    console.log("CONNECTED DB INFO:", result);

  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

export default sequelize;

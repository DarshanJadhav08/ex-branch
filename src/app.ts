import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import sequelize from "./db/config";

import "./model/authUser.model";
import "./model/expense.model";
import userRoutes from "./routes/user.routes";

const app = Fastify({ logger: true });

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(userRoutes);

const start = async () => {
  const port = Number(process.env.PORT) || 3000;

  try {
    // 🔹 Start server FIRST (important for Render)
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Server running on port ${port}`);

    // 🔹 Then connect DB (non-blocking startup)
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Startup error", err);
  }
};

start();

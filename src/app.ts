import "dotenv/config";

import Fastify from "fastify";
import cors from "@fastify/cors";
import sequelize from "./db/config";

import "./model/authUser.model";
import "./model/expense.model";
import userRoutes from "./routes/user.routes";

const app = Fastify({ logger: true });

// ✅ CORRECT CORS CONFIG (THIS FIXES YOUR ISSUE)
app.register(cors, {
  origin: true, // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(userRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port, host: "0.0.0.0" });

    console.log(`🚀 Server running on port ${port}`);
  } catch (err) {
    console.error("❌ Server start failed", err);
    process.exit(1);
  }
};

start();

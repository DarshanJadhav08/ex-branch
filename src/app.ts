import "dotenv/config";

import Fastify from "fastify";
import sequelize from "./db/config";

import "./model/authUser.model";
import "./model/expense.model";

import userRoutes from "./routes/user.routes";

const app = Fastify({ logger: true });

app.register(userRoutes);

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  await app.listen({
    port: Number(process.env.PORT) || 3000,
    host: "0.0.0.0",
  });

  console.log("🚀 Server started");
};

start();

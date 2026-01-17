import { FastifyInstance } from "fastify";
import { UserController } from "../controller/user.controller";

export default async function (app: FastifyInstance) {
  app.post("/register", UserController.register);
  app.post("/login", UserController.login);

  app.post("/add-amount/:id", UserController.addAmount);
  app.post("/add-expense/:id", UserController.addExpense);

  app.get("/quick-stats/:id", UserController.quickStats);
  app.get("/report/:id", UserController.report);
  app.get("/report/download/:id", UserController.downloadReport);
}

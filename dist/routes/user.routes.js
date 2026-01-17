"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const user_controller_1 = require("../controller/user.controller");
async function default_1(app) {
    app.post("/register", user_controller_1.UserController.register);
    app.post("/login", user_controller_1.UserController.login);
    app.post("/add-amount/:id", user_controller_1.UserController.addAmount);
    app.post("/add-expense/:id", user_controller_1.UserController.addExpense);
    app.get("/quick-stats/:id", user_controller_1.UserController.quickStats);
    app.get("/report/:id", user_controller_1.UserController.report);
    app.get("/report/download/:id", user_controller_1.UserController.downloadReport);
}

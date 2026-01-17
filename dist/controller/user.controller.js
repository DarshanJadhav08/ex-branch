"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
const pdf_util_1 = require("../utils/pdf.util");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.register = async (req, res) => res.send(await user_service_1.UserService.register(req.body));
UserController.login = async (req, res) => res.send(await user_service_1.UserService.login(req.body));
UserController.addAmount = async (req, res) => res.send(await user_service_1.UserService.addAmount(+req.params.id, req.body));
UserController.addExpense = async (req, res) => res.send(await user_service_1.UserService.addExpense(+req.params.id, req.body));
UserController.quickStats = async (req, res) => res.send(await user_service_1.UserService.quickStats(+req.params.id));
UserController.report = async (req, res) => res.send(await user_service_1.UserService.report(+req.params.id));
UserController.downloadReport = async (req, res) => {
    const result = await user_service_1.UserService.report(+req.params.id);
    (0, pdf_util_1.generatePDF)(res, result.data);
};

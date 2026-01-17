import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../service/user.service";
import { generatePDF } from "../utils/pdf.util";

export class UserController {
  static register = async (req: FastifyRequest, res: FastifyReply) =>
    res.send(await UserService.register(req.body as any));

  static login = async (req: FastifyRequest, res: FastifyReply) =>
    res.send(await UserService.login(req.body as any));

  static addAmount = async (req: any, res: FastifyReply) =>
    res.send(await UserService.addAmount(+req.params.id, req.body));

  static addExpense = async (req: any, res: FastifyReply) =>
    res.send(await UserService.addExpense(+req.params.id, req.body));

  static quickStats = async (req: any, res: FastifyReply) =>
    res.send(await UserService.quickStats(+req.params.id));

  static report = async (req: any, res: FastifyReply) =>
    res.send(await UserService.report(+req.params.id));

  static downloadReport = async (req: any, res: FastifyReply) => {
    const result = await UserService.report(+req.params.id);
    generatePDF(res, result.data);
  };
}

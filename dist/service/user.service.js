"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repository_1 = require("../repository/auth.repository");
const expense_repository_1 = require("../repository/expense.repository");
class UserService {
    // REGISTER
    static async register(data) {
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await auth_repository_1.AuthRepository.createUser({
            first_name: data.first_name,
            last_name: data.last_name,
            password: hashedPassword,
        });
        await expense_repository_1.ExpenseRepository.createExpense({
            id: user.id,
            // 🔥 FIX HERE
            first_name: data.first_name,
            last_name: data.last_name,
            initial_amount: data.initial_amount ?? 0,
            created_by: user.id,
            updated_by: user.id,
        });
        return {
            success: true,
            data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                total_amount: data.initial_amount ?? 0,
            },
        };
    }
    // LOGIN
    static async login(data) {
        const user = await auth_repository_1.AuthRepository.findByName(data.first_name, data.last_name);
        if (!user)
            throw new Error("User not found");
        const ok = await bcrypt_1.default.compare(data.password, user.password);
        if (!ok)
            throw new Error("Invalid password");
        return {
            success: true,
            data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        };
    }
    // ADD AMOUNT
    static async addAmount(userId, data) {
        const expense = await expense_repository_1.ExpenseRepository.findByUserId(userId);
        if (!expense)
            throw new Error("Expense record not found");
        expense.total_amount += data.amount;
        expense.remaining_amount += data.amount;
        expense.description = data.description || null;
        expense.updated_by = userId;
        await expense_repository_1.ExpenseRepository.update(expense);
        return {
            success: true,
            data: {
                total_amount: expense.total_amount,
                remaining_amount: expense.remaining_amount,
            },
        };
    }
    // ADD EXPENSE
    static async addExpense(userId, data) {
        const expense = await expense_repository_1.ExpenseRepository.findByUserId(userId);
        if (!expense)
            throw new Error("Expense record not found");
        expense.expense_amount += data.amount;
        expense.remaining_amount =
            expense.total_amount - expense.expense_amount;
        expense.category = data.category || null;
        expense.description = data.description || null;
        expense.updated_by = userId;
        await expense_repository_1.ExpenseRepository.update(expense);
        return {
            success: true,
            data: {
                expense_amount: expense.expense_amount,
                remaining_amount: expense.remaining_amount,
            },
        };
    }
    // QUICK STATS
    static async quickStats(userId) {
        const e = await expense_repository_1.ExpenseRepository.findByUserId(userId);
        if (!e)
            throw new Error("Expense record not found");
        return {
            success: true,
            data: {
                total_amount: e.total_amount,
                expense_amount: e.expense_amount,
                remaining_amount: e.remaining_amount,
            },
        };
    }
    // REPORT
    static async report(userId) {
        const e = await expense_repository_1.ExpenseRepository.findByUserId(userId);
        if (!e)
            throw new Error("Expense record not found");
        return {
            success: true,
            data: {
                total_amount: e.total_amount,
                expense_amount: e.expense_amount,
                remaining_amount: e.remaining_amount,
                category: e.category,
                description: e.description,
                created_by: e.created_by,
                updated_by: e.updated_by,
                generated_at: new Date().toISOString(),
            },
        };
    }
}
exports.UserService = UserService;

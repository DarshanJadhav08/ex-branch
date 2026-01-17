"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRepository = void 0;
const expense_model_1 = require("../model/expense.model");
class ExpenseRepository {
    static createExpense(data) {
        return expense_model_1.Expense.create({
            id: data.id,
            // ✅ STORE USER NAME
            first_name: data.first_name,
            last_name: data.last_name,
            total_amount: data.initial_amount,
            expense_amount: 0,
            remaining_amount: data.initial_amount,
            created_by: data.created_by,
            updated_by: data.updated_by,
        });
    }
    static findByUserId(userId) {
        return expense_model_1.Expense.findByPk(userId);
    }
    static update(expense) {
        return expense.save();
    }
}
exports.ExpenseRepository = ExpenseRepository;

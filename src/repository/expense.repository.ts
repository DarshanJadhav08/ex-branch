import { Expense } from "../model/expense.model";

export class ExpenseRepository {
  static createExpense(data: {
    id: number;
    first_name: string;
    last_name: string;
    initial_amount: number;
    created_by: number;
    updated_by: number;
  }) {
    return Expense.create({
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

  static findByUserId(userId: number) {
    return Expense.findByPk(userId);
  }

  static update(expense: Expense) {
    return expense.save();
  }
}

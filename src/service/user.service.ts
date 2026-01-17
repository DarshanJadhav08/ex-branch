import bcrypt from "bcrypt";
import { AuthRepository } from "../repository/auth.repository";
import { ExpenseRepository } from "../repository/expense.repository";

export class UserService {
  // REGISTER
  static async register(data: {
    first_name: string;
    last_name: string;
    password: string;
    initial_amount: number;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await AuthRepository.createUser({
      first_name: data.first_name,
      last_name: data.last_name,
      password: hashedPassword,
    });

    await ExpenseRepository.createExpense({
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
  static async login(data: {
    first_name: string;
    last_name: string;
    password: string;
  }) {
    const user = await AuthRepository.findByName(
      data.first_name,
      data.last_name
    );
    if (!user) throw new Error("User not found");

    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) throw new Error("Invalid password");

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
  static async addAmount(
    userId: number,
    data: { amount: number; description?: string }
  ) {
    const expense = await ExpenseRepository.findByUserId(userId);
    if (!expense) throw new Error("Expense record not found");

    expense.total_amount += data.amount;
    expense.remaining_amount += data.amount;
    expense.description = data.description || null;
    expense.updated_by = userId;

    await ExpenseRepository.update(expense);

    return {
      success: true,
      data: {
        total_amount: expense.total_amount,
        remaining_amount: expense.remaining_amount,
      },
    };
  }

  // ADD EXPENSE
  static async addExpense(
    userId: number,
    data: { amount: number; category?: string; description?: string }
  ) {
    const expense = await ExpenseRepository.findByUserId(userId);
    if (!expense) throw new Error("Expense record not found");

    expense.expense_amount += data.amount;
    expense.remaining_amount =
      expense.total_amount - expense.expense_amount;

    expense.category = data.category || null;
    expense.description = data.description || null;
    expense.updated_by = userId;

    await ExpenseRepository.update(expense);

    return {
      success: true,
      data: {
        expense_amount: expense.expense_amount,
        remaining_amount: expense.remaining_amount,
      },
    };
  }

  // QUICK STATS
  static async quickStats(userId: number) {
    const e = await ExpenseRepository.findByUserId(userId);
    if (!e) throw new Error("Expense record not found");

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
  static async report(userId: number) {
    const e = await ExpenseRepository.findByUserId(userId);
    if (!e) throw new Error("Expense record not found");

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

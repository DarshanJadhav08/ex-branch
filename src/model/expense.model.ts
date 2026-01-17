import { DataTypes, Model } from "sequelize";
import sequelize from "../db/config";

export class Expense extends Model {
  declare id: number;

  declare first_name: string;
  declare last_name: string;

  declare total_amount: number;
  declare expense_amount: number;
  declare remaining_amount: number;

  declare category: string | null;
  declare description: string | null;

  declare created_by: number;
  declare updated_by: number;
}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    // ✅ NEW (USER NAME SNAPSHOT)
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    total_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    expense_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    remaining_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "expense",
    timestamps: false,
  }
);

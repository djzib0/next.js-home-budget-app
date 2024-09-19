import { ExpenseType } from "./enums";

export type Expense = {
    userId: string;
    value: number;
    group: ExpenseType;
}
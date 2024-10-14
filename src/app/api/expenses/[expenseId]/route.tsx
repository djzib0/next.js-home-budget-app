import { Expense } from "@/lib/models";
import { connectToDb } from "@/lib/mongooseUtils";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (request: never, {params}: {params: {expenseId: string}}) => {
    const {expenseId} = params;
    noStore();
    try {
        connectToDb();
        const expense = await Expense.findById(expenseId);
        return NextResponse.json(expense);
    } catch (err) {
        throw new Error("Failed to fetch expense with the given id!")
    }
}

export const DELETE = async (request: never, {params}: {params: {expenseId: string}}) => {
    const {expenseId} = params;

    try {
        connectToDb();
        await Expense.findByIdAndDelete(expenseId);
        return NextResponse.json("Expense deleted")
    } catch (err) {
        console.log(err)
        throw new Error("Failed to delete expense!")
    }
}
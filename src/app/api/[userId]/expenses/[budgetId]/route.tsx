import { Expense } from "@/lib/models";
import { connectToDb } from "@/lib/mongooseUtils";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (request: never, {params}: {params: Promise<{userId: string; budgetId: string}>}) => {
    const {userId, budgetId} = await params;
    noStore();
    try {
        connectToDb();
        const expenses = await Expense.find({userId: userId, budgetId: budgetId });
        return NextResponse.json(expenses);
    } catch (err) {
        throw new Error("Failed to fetch expenses!")
    }
}
import { Budget } from "@/lib/models";
import { connectToDb } from "@/lib/mongooseUtils";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const GET = async (request: never, {params}: {params: any}) => {
    const {userId, budgetId} = params;
    noStore();
    try {
        connectToDb();
        const expenses = await Budget.find({userId: userId, budgetId: budgetId });
        return NextResponse.json(expenses);
    } catch (err) {
        throw new Error("Failed to fetch expenses!")
    }
}
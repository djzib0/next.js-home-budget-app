import { Budget } from "@/lib/models";
import { connectToDb } from "@/lib/mongooseUtils";
import { unstable_noStore } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (request: never, {params}: {params: {budgetId: string}}) => {
    const {budgetId} = params;
    unstable_noStore();
    try {
        connectToDb();
        const budget = await Budget.findById(budgetId);
        return NextResponse.json(budget);
    } catch (err) {
        throw new Error("Failed to fetch budget with the given id!")
    }
}
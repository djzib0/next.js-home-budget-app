import { Budget } from "@/lib/models";
import { connectToDb } from "@/lib/mongooseUtils";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (request: never, userId: string) => {
    noStore();
    try {
        connectToDb();
        const budgets = await Budget.find({userId: '66e9b5c6dea170f39e2e1da0'});
        return NextResponse.json(budgets);
    } catch (err) {
        throw new Error("Failed to fetch budgets!")
    }
}
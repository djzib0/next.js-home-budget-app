import { Budget } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (request: never) => {
    noStore();
    try {
        connectToDb();
        const budgets = await Budget.find();
        return NextResponse.json(budgets);
    } catch (err) {
        throw new Error("Failed to fetch budgets!")
    }
}
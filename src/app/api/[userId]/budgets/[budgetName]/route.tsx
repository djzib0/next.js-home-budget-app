import { connectToDb } from "@/lib/mongooseUtils";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { Budget } from "@/lib/models";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const GET = async (request: never,{params} : {params: Promise<{userId: string, budgetName: string}>}) => {
    const {userId, budgetName} = await params;
    noStore();
    try {
        connectToDb();
        const budget = await Budget.findOne({userId: userId, budgetName: budgetName});
        return NextResponse.json(budget);
    } catch (err) {
        throw new Error("Failed to fetch requested budget!")
    }
}
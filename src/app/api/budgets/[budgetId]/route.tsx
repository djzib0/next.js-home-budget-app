import { Budget } from "@/lib/models";
import { connectToDb } from "@/lib/mongooseUtils";
import { unstable_noStore } from "next/cache";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async (request: never, {params}: {params: {budgetId: string}}) => {
    const {budgetId} = params;
    console.log(budgetId, " paraaaaaaaaaaaaaaaaaaams")
    unstable_noStore();
    try {
        connectToDb();
        const budget = await Budget.findById(budgetId);
        return NextResponse.json(budget);
    } catch (err) {
        throw new Error("Failed to fetch budget with the given id!")
    }
}

// export const DELETE = async (request: never, {params}: {params: {budgetId: string}}) => {
//     const {budgetId} = params;
//     console.log("I'm heere", budgetId)
//     try {
//         connectToDb();
//         await Budget.findByIdAndDelete(budgetId);
//         return NextResponse.json("Budget deleted.")
//     } catch (err) {
//         console.log(err)
//         throw new Error("Failed to delete budget!")
//     }
// }
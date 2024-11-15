import { User } from "@/lib/models";
import { connectToDb } from "@/lib/mongooseUtils";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (request: never, userId: string) => {
    noStore();
    try {
        connectToDb();
        console.log(userId, " in api")
        const user = await User.findById(userId);
        return NextResponse.json(user);
    } catch (err) {
        throw new Error("Failed to fetch budgets!")
    }
}
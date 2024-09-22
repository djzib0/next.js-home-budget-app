import { Budget } from "./models";
import { connectToDb } from "./mongooseUtils";
import { unstable_noStore as noStore } from "next/cache";

export const getBudgets = async () => {
    noStore();
    try {
        connectToDb();
        const budgetsArr = await Budget.find();
        return budgetsArr
    } catch (err) {
        console.log(err)
        throw new Error("Faile to fetch budgets!")
    }
}
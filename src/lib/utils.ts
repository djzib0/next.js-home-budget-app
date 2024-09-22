import { BudgetType } from "./types";

export const findLatestBudget = (budgetsArr: BudgetType[]) => {
    const budgetIdsArray: string[] = [];
    let latestId = "0";
    budgetsArr.map((budget) => budgetIdsArray.push(budget.budgetId))
    for (const id of budgetIdsArray) {
        if (parseInt(id) > parseInt(latestId)) {
            latestId = id;
        } 
    }
    console.log(latestId, "latest id")

    return latestId
}
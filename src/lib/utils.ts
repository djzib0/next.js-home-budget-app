import { BudgetType } from "./types";

export const findLatestBudget = (budgetsArr: BudgetType[]) => {
    const budgetNamesArr: string[] = [];
    let latestId = "0";
    budgetsArr.map((budget) => budgetNamesArr.push(budget.budgetName))
    for (const id of budgetNamesArr) {
        if (parseInt(id) > parseInt(latestId)) {
            latestId = id;
        } 
    }
    console.log(latestId, "latest id")

    return latestId
}


// budget name is a combination of year and month (for example)
// 2024 Nov = 2411. Below function checks the current date
// and converts it to budget name. It will be use to check
// if the user has created budget for the current month 
export const getExpectedCurrentBudgetName = () : string =>  {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentBudgetName = currentYear.toString().slice(2) + addZeroPrefix(currentMonth + 1);
    return currentBudgetName
}

export const addZeroPrefix = (num: number) : string => {
    let newNum: string = num.toString();
    if (num < 10) {
        newNum = "0" + num;
        return newNum
    }
    return newNum;
}
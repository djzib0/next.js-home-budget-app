export type Budget = {
    // it's a combination of month and year
    // for example 1124 = budget for November 2024
    budgetName: string; 
    userId: string;
    // groceriesBudget: number;
    // eatingOutBudget: number;
    // otherFoodAndDrinksBudget: number;
    // doctorsBudget: number;
    // drugsBudget: number;
    // otherMedicalBudget: number;
    // clothesHerBudget: number;
    // clothesHisBudget: number;
    // clothesKidsBudget: number;
    // rentBudget: number;
    // electricityBudget: number;
    // internetBudget: number;
    // phonesBudget: number;
    // streamingServicesBudget: number;
    // otherBudget: number;
    groceriesBudget: number;
    groceriesBudgetComments: string[];
    clothesBudget: number;
    clothesBudgetComments: string[];
    billsBudget: number;
    billsBudgetComments: string[];
}

export enum ExpenseType {
    Groceries = "Groceries",
    Clothes = "Clothes",
    Bills = "Bills"
}
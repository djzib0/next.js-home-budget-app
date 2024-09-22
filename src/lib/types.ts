import { ExpenseType } from "./enums";

export type BudgetType = {
    // budgetName is a combination of year and month
    // for example 2411 = budget for November 2024
    budgetName: string;
    userId: string;
    groceriesBudget: number;
    eatingOutBudget: number;
    otherFoodAndDrinksBudget: number;
    foodAndDrinksBudgetComments: string[];
    doctorsBudget: number;
    drugsBudget: number;
    otherMedicalBudget: number;
    healthBudgetComments: string[],
    fuelBudget: number;
    publicTransportBudget: number;
    otherTransportBudget: number;
    transportBudgetComments: string[];
    clothesHerBudget: number;
    clothesHisBudget: number;
    clothesKidsBudget: number;
    clothesBudgetComments: string[],
    rentBudget: number;
    electricityBudget: number;
    waterSupplyAndSewageBudget: number;
    gasBudget: number;
    billsBudgetComments: string[];
    internetBudget: number;
    phonesBudget: number;
    streamingServicesBudget: number;
    telecommunicationBudgetComments: string[];
    hobbyBudget: number;
    hobbyBudgetComments: string[];
    otherBudget: number;
    otherBudgetComments: string[];
}

export type Expense = {
    userId: string;
    value: number;
    group: ExpenseType;
}
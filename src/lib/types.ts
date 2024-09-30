import { ClothesExpense, DigitalServicesExpense, FoodExpense, HealthExpense, HobbyExpense, HomeExpense, OtherExpense, TransportExpense } from "./enums";

export type BudgetType = {
    _id: string;
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
    otherBillsBudget: number,
    billsBudgetComments: string[];
    internetBudget: number;
    phonesBudget: number;
    streamingServicesBudget: number;
    otherDigitalServices: number;
    telecommunicationBudgetComments: string[];
    hobbyBudget: number;
    hobbyBudgetComments: string[];
    otherBudget: number;
    otherBudgetComments: string[];
}

export type BudgetFormType = {
    budgetNameYear: number,
    budgetNameMonth: string,
    groceriesBudget: number;
    eatingOutBudget: number;
    otherFoodAndDrinksBudget: number;
    doctorsBudget: number;
    drugsBudget: number;
    otherMedicalBudget: number;
    fuelBudget: number;
    publicTransportBudget: number;
    otherTransportBudget: number;
    clothesHerBudget: number;
    clothesHisBudget: number;
    clothesKidsBudget: number;
    rentBudget: number;
    electricityBudget: number;
    waterSupplyAndSewageBudget: number;
    gasBudget: number;
    otherBillsBudget: number,
    internetBudget: number;
    phonesBudget: number;
    streamingServicesBudget: number;
    otherDigitalServices: number;
    hobbyBudget: number;
    otherBudget: number;
}

export type Expense = {
    id: string;
    userId: string;
    budgetId: string;
    value: number;
    group: FoodExpense | HealthExpense | TransportExpense | ClothesExpense | HomeExpense | DigitalServicesExpense | HobbyExpense | OtherExpense
}

export type ExpenseFormType = {
    userId: string;
    budgetId: string;
    value: number;
    group: string;
}
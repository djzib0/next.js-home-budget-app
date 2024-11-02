import { ClothesExpense, DigitalServicesExpense, ExpenseGroup, FoodExpense, HealthExpense, HobbyExpense, HomeExpense, MonthNameLength, OtherExpense, TransportExpense } from "./enums";
import { BudgetType, Expense, ExpenseFormType, Value } from "./types";

export const findLatestBudgetName = (budgetsArr: BudgetType[]) => {
    const budgetNamesArr: string[] = [];
    let latestId = "0";
    budgetsArr.map((budget) => budgetNamesArr.push(budget.budgetName))
    for (const id of budgetNamesArr) {
        if (parseInt(id) > parseInt(latestId)) {
            latestId = id;
        } 
    }

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

export const convertYearToBudgetName = (year: string) : string => {
    return year.slice(2)
}

export const convertBudgetNameToMonth = (budgetName: string) : string => {
    return budgetName.slice(2)
}

export const convertBudgetNameToYear = (budgetName: string) : number => {
    return parseInt("20" + budgetName.slice(0, 2).toString());
}

export const convertDateToBudgetName = (date: Value) : string => {
    // calendar picker, when the it's props maxDetail is set to 'year',
    // save picked date wrongly, for example if you pick 5th month (May)
    // it will set picked date to Sat Jan 05 2021, 
    // if April Mon Jan 04 (so the day number is month number).
    // The below code takes it into account and converts correctly
    // picked date to budget name
    if (date) {
        const newDate = new Date(date.toLocaleString())
        const newDateArr =newDate.toString().split(" ");
        const budgetName = newDateArr[3].slice(2) + newDateArr[2];
        return budgetName
    }
    return "";
}

export const addZeroPrefix = (num: number) : string => {
    let newNum: string = num.toString();
    if (num < 10) {
        newNum = "0" + num;
        return newNum
    }
    return newNum;
}

export const convertToMonthName = (monthNumber: number, language: string, monthNameLength: MonthNameLength) : string => {
    // declare new generic date to get the month name from it
    const date = new Date(`2000-${addZeroPrefix(monthNumber)}-01`);
    // get name 
    const monthName = date.toLocaleString(language, {month: monthNameLength});
    return monthName
}

export const convertBudgetNameToDate = (budgetName: string, language: string) : string => {

    const yearFromBudgetName = 2000 + parseInt(budgetName.slice(0,2));
    const monthFromBudgetName = parseInt(budgetName.slice(2)) - 1;
    const newDate = new Date(yearFromBudgetName, monthFromBudgetName )
    const monthName = newDate.toLocaleDateString(language , {month: "long"})
    
    return monthName + " " + newDate.getFullYear();
}

export const convertBudgetDataToChartData = (budget: BudgetType) => {
    // array with all budgets values from the passed budget
    const valuesArr = [
        budget.groceriesBudget,
        budget.eatingOutBudget,
        budget.otherFoodAndDrinksBudget,
        budget.doctorsBudget,
        budget.drugsBudget,
        budget.otherMedicalBudget,
        budget.fuelBudget,
        budget.publicTransportBudget,
        budget.otherTransportBudget,
        budget.clothesHerBudget,
        budget.clothesHisBudget,
        budget.clothesKidsBudget,
        budget.rentBudget,
        budget.electricityBudget,
        budget.waterSupplyAndSewageBudget,
        budget.gasBudget,
        budget.otherBillsBudget,
        budget.internetBudget,
        budget.phonesBudget,
        budget.streamingServicesBudget,
        budget.otherDigitalServices,
        budget.hobbyBudget,
        budget.otherBudget,
    ]
    // when the sum is equal to zero it means there was not budget
    // set, so no need to display it on the chart.
    const valuesWithoutZeroValues = valuesArr.filter((value) => value > 0);
    // create labels - when the budget for specific item is 
    // equal to zero, don't return the name
    const labelsArr = [
        getLabelName(budget.groceriesBudget, 'Groceries'),
        getLabelName(budget.eatingOutBudget,  'Eating out'),
        getLabelName(budget.otherFoodAndDrinksBudget, 'Other Food and Drinks'),
        getLabelName(budget.doctorsBudget,'Doctor/health'),
        getLabelName(budget.drugsBudget, 'Drugs'),
        getLabelName(budget.otherMedicalBudget, 'Other medical'),
        getLabelName(budget.fuelBudget, 'Fuel'),
        getLabelName(budget.publicTransportBudget,'Public Transport'),
        getLabelName(budget.otherTransportBudget, 'Other Transport'),
        getLabelName(budget.clothesHerBudget,'Clothes - Her'),
        getLabelName(budget.clothesHisBudget,'Clothes - His'),
        getLabelName(budget.clothesKidsBudget,'Clothes - Kids'),
        getLabelName(budget.rentBudget, 'Rent'),
        getLabelName(budget.electricityBudget, 'Electricity'),
        getLabelName(budget.waterSupplyAndSewageBudget, 'Water and Sewage'),
        getLabelName(budget.gasBudget, 'Gas'),
        getLabelName(budget.otherBillsBudget, 'Other bills'),
        getLabelName(budget.internetBudget, 'Internet'),
        getLabelName(budget.phonesBudget, 'Phones'),
        getLabelName(budget.streamingServicesBudget,'Streaming Serv.'),
        getLabelName(budget.otherDigitalServices,'Other Digital Serv.'),
        getLabelName(budget.hobbyBudget,'Hobby'),
        getLabelName(budget.otherBudget,'Other'),
    ]
    // The above array contains the label name for the entries with
    // value more than zero, but when the value is zero it return undefined
    // We want to remove these undefined values.
    const labelsWithoutUndefined = labelsArr.filter((label) => label != undefined)
    const data = [
        {
          values: valuesWithoutZeroValues,
          labels: labelsWithoutUndefined,
          type: 'pie',
          textinfo: "label+percent",
          textposition: "outside",
          insidetextorientation: "radial",
        }
      ]
    return data;
}

export const getLabelName = (value: number, labelName: string) => {
    if (value > 0) return labelName;
}

export const sumBudgetForMainGroup = (budget: BudgetType) => {
    const foodBudget: number = budget.groceriesBudget + budget.eatingOutBudget + budget.otherFoodAndDrinksBudget;
    const healthBudget: number = budget.doctorsBudget + budget.drugsBudget + budget.otherMedicalBudget;
    const transportBudget: number = budget.fuelBudget + budget.publicTransportBudget + budget.otherTransportBudget;
    const clothesBudget: number = budget.clothesHerBudget + budget.clothesHisBudget + budget.clothesKidsBudget;
    const homeBudget: number = budget.rentBudget + budget.electricityBudget + budget.waterSupplyAndSewageBudget + budget.gasBudget + budget.otherBillsBudget;
    const digitalServices: number = budget.internetBudget + budget.phonesBudget + budget.streamingServicesBudget + budget.otherDigitalServices;
    const hobbyBudget: number = budget.hobbyBudget
    const otherBudget: number = budget.otherBudget

    return {
        foodBudget: foodBudget,
        healthBudget: healthBudget,
        transportBudget: transportBudget,
        clothesBudget: clothesBudget,
        homeBudget: homeBudget,
        digitalServices: digitalServices,
        hobbyBudget: hobbyBudget,
        otherBudget: otherBudget
    }
}

export const convertBudgetToAggregatedChartData = (budget: BudgetType) => {
    const foodBudget: number = budget.groceriesBudget + budget.eatingOutBudget + budget.otherFoodAndDrinksBudget;
    const healthBudget: number = budget.doctorsBudget + budget.drugsBudget + budget.otherMedicalBudget;
    const transportBudget: number = budget.fuelBudget + budget.publicTransportBudget + budget.otherTransportBudget;
    const clothesBudget: number = budget.clothesHerBudget + budget.clothesHisBudget + budget.clothesKidsBudget;
    const costOfLivingBudget: number = budget.rentBudget + budget.electricityBudget + budget.waterSupplyAndSewageBudget + budget.gasBudget + budget.otherBillsBudget;
    const billsBudget: number = budget.internetBudget + budget.phonesBudget + budget.streamingServicesBudget + budget.otherDigitalServices;
    const hobbyBudget: number = budget.hobbyBudget
    const otherBudget: number = budget.otherBudget
    
    const valuesArr = [
        foodBudget,
        healthBudget,
        transportBudget,
        clothesBudget,
        costOfLivingBudget,
        billsBudget,
        hobbyBudget,
        otherBudget,
    ]
    // when the sum is equal to zero it means there was not budget
    // set, so no need to display it on the chart.
    const valuesWithoutZeroValues = valuesArr.filter((value) => value > 0);

    const labelsArr = [
        getLabelName(foodBudget, 'Food'),
        getLabelName(healthBudget, 'Health'),
        getLabelName(transportBudget, 'Transport'),
        getLabelName(clothesBudget, 'Clothes'),
        getLabelName(costOfLivingBudget, 'Home Living'),
        getLabelName(billsBudget, 'Digital services'),
        getLabelName(hobbyBudget, 'Hobby'),
        getLabelName(otherBudget, 'Other')
    ]
    // The above array contains the label name for the entries with
    // value more than zero, but when the value is zero it return undefined
    // We want to remove these undefined values.
    const labelsWithoutUndefined = labelsArr.filter((label) => label != undefined)
    const data = [
        {
          values: valuesWithoutZeroValues,
          labels: labelsWithoutUndefined,
          type: 'pie',
          textinfo: "label+percent",
          textposition: "outside",
          insidetextorientation: "radial",
        }
      ]
    return data;
}

export const sumBudget = (budget: BudgetType) => {
    const sum = budget.groceriesBudget +
                budget.eatingOutBudget +
                budget.otherFoodAndDrinksBudget + 
                budget.doctorsBudget + 
                budget.drugsBudget + 
                budget.otherMedicalBudget +
                budget.fuelBudget +
                budget.publicTransportBudget +
                budget.otherTransportBudget +
                budget.clothesHerBudget +
                budget.clothesHisBudget +
                budget.clothesKidsBudget +
                budget.rentBudget +
                budget.electricityBudget +
                budget.waterSupplyAndSewageBudget +
                budget.gasBudget +
                budget.otherBillsBudget +
                budget.internetBudget +
                budget.phonesBudget +
                budget.streamingServicesBudget + 
                budget.otherDigitalServices +
                budget.hobbyBudget +
                budget.otherBudget 
    return sum;

}

export const sumAllExpenses = (expenses: Expense[]) : number => {
    return expenses.reduce((n, {value}) => n + value, 0)
}

export const getProgressPercent = (a: number, b: number) => {
    if ((a -b) > 100 || b === 0) {
        return 100;
    }
    return Math.round((a / b) * 100);
}

export const getIsNumberInRange = (num: number, start: number, end: number) : boolean => {
    if (num >= start && num <= end ) {
        return true;
    }
    return false
}


export const setExpenseGroup = (expense: Expense | ExpenseFormType) => {
    const foodValuesArr: string[] = Object.values(FoodExpense)
    const healthValuesArr: string[] = Object.values(HealthExpense)
    const transportValuesArr: string[] = Object.values(TransportExpense)
    const clothesValuesArr: string[] = Object.values(ClothesExpense)
    const homeValuesArr: string[] = Object.values(HomeExpense)
    const digitalServicesValuesArr: string[] = Object.values(DigitalServicesExpense)
    const hobbyValuesArr: string[] = Object.values(HobbyExpense)
    const otherValuesArr: string[] = Object.values(OtherExpense)
    if (foodValuesArr.includes(expense.group)) {
        return ({
            ...expense,
            mainGroup: ExpenseGroup.Food
        })
    }

    if (healthValuesArr.includes(expense.group)) {
        return ({
            ...expense,
            mainGroup: ExpenseGroup.Health
        })
    }        

    if (transportValuesArr.includes(expense.group)) {
        return ({
            ...expense,
            mainGroup: ExpenseGroup.Transport
        })
    }        

    if (clothesValuesArr.includes(expense.group)) {
        return ({
            ...expense,
            mainGroup: ExpenseGroup.Clothes
        })
    }        
    if (homeValuesArr.includes(expense.group)) {
        return ({
            ...expense,
            mainGroup: ExpenseGroup.Home
        })
    }        
    if (digitalServicesValuesArr.includes(expense.group)) {
        return ({
            ...expense,
            mainGroup: ExpenseGroup.DigitalServices
        })
    }        
    if (hobbyValuesArr.includes(expense.group)) {
        return ({
            ...expense,
            mainGroup: ExpenseGroup.Hobby
        })
    }        
    if (otherValuesArr.includes(expense.group)) {
        return ({
            ...expense,
            mainGroup: ExpenseGroup.Other
        })        
    }
}

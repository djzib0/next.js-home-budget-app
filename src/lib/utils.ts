import { MonthNameLength } from "./enums";
import { BudgetType, Expense } from "./types";

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

export const converYearToBudgetName = (year: string) : string => {
    return year.slice(2)
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
    if ((a -b) > 100) {
        return 100;
    }
    return Math.round((a / b) * 100);
}


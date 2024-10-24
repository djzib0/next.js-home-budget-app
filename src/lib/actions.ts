'use server'
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { Budget, User, BudgetComment, Expense } from "./models";
import { connectToDb } from "./mongooseUtils";
import bcrypt from "bcryptjs";
import { converYearToBudgetName } from "./utils";
import mongoose from "mongoose";

export const handleGitHubLogin = async () => {
    'use server'
    await signIn("github")
}

export const handleGitHubLogout = async () => {
    'use server'
    await signOut()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerNewUser = async (prevState: any, formData: any) => {
    // 'use server'
    const {username, password, email, passwordRepeat, img} = Object.fromEntries(formData)
    if (password !== passwordRepeat) {
        console.log("Password do not match, gringo.")
        return {error: "Passwords do not match"}
    }

    try {
        connectToDb();

        // check if the user already exists
        const user = await User.findOne({username})

        // if user exists, return an error
        if (user) {
            console.log("This user already exists, my friend.")
            return {error: "User already exists."}
        }

        // check if email already exists
        // if exists, return an error
        const userEmail = await User.findOne({email})

        if (userEmail) {
            console.log("This email is used, my friend.")
            return {error: "This email is already registered."}
        }

        // hash password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // if the user or email doesn't exist in the DB,
        // create a new one and save in DB.
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img
        })

        await newUser.save();
        console.log("new user saved to db")

        return {success: true}
    } catch (err) {
        console.log(err)
        return {error: "Something went wrong."}
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (prevState: any, formData: any) => {
    const {username, password} = Object.fromEntries(formData)

    try {
        await signIn("credentials", {username, password});
        revalidatePath("/budgets")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error) 
        if (error.message.includes("credentialssignin")) {
            return {error: "Wrong username or password!"}
        } else {
            return {success: "Logged in!"}
        }
        throw error
    }
}

export const logout = async () => {
    await signOut();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNewBudget = async (prevState: any, formData: any) => {
    try {
        const {
            userId,
            budgetNameYear,
            budgetNameMonth,
            groceriesBudget,
            eatingOutBudget,
            otherFoodAndDrinksBudget,
            doctorsBudget,
            drugsBudget,
            otherMedicalBudget,
            fuelBudget,
            publicTransportBudget,
            otherTransportBudget,
            clothesHerBudget,
            clothesHisBudget,
            clothesKidsBudget,
            rentBudget,
            electricityBudget,
            waterSupplyAndSewageBudget,
            gasBudget,
            otherBillsBudget,
            internetBudget, 
            phonesBudget,
            streamingServicesBudget,
            otherDigitalServices,
            hobbyBudget,
            otherBudget,
            billsBudget,
        } = Object.fromEntries(formData);
        connectToDb();
        const newBudget = new Budget({
            budgetName: converYearToBudgetName(budgetNameYear) + budgetNameMonth,
            userId: userId,
            groceriesBudget: groceriesBudget,
            eatingOutBudget: eatingOutBudget,
            otherFoodAndDrinksBudget: otherFoodAndDrinksBudget,
            groceriesBudgetComments: [new BudgetComment({comment: " test comment"})],
            doctorsBudget: doctorsBudget,
            drugsBudget: drugsBudget,
            otherMedicalBudget: otherMedicalBudget,
            fuelBudget: fuelBudget,
            publicTransportBudget: publicTransportBudget,
            otherTransportBudget: otherTransportBudget,
            clothesHerBudget: clothesHerBudget,
            clothesHisBudget: clothesHisBudget,
            clothesKidsBudget: clothesKidsBudget,
            rentBudget: rentBudget,
            electricityBudget: electricityBudget,
            waterSupplyAndSewageBudget: waterSupplyAndSewageBudget,
            gasBudget: gasBudget,
            otherBillsBudget: otherBillsBudget,
            internetBudget: internetBudget, 
            phonesBudget: phonesBudget,
            streamingServicesBudget: streamingServicesBudget,
            otherDigitalServices: otherDigitalServices,
            hobbyBudget: hobbyBudget,
            otherBudget: otherBudget,
            clothesBudgetComments: [],
            billsBudget: billsBudget,
            billsBudgetComments: [],
        })

        try {

            if (newBudget.length > 4 || newBudget.budgetName < 4) {
                return {error: ["budgetName"]}
            }
            // try to find budget with the given budget name
            const budgets = await Budget.find({budgetName: converYearToBudgetName(budgetNameYear) + budgetNameMonth, userId: userId});
            // if the budget for specific month/year exists,
            // the budgets (array) will be longer than 0, so it means
            // there is a budget with the given name 
            // ...return an error
            if (budgets.length > 0) {
                console.log("There is already a budget for this month. Mate")
                return {error: "There is already a budget for this month."}
            }
            // if there is no budget for specific month/year
            // create and save a new one
            await newBudget.save();
            revalidatePath("/budgets")
        } catch (error) {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
                const invalidFormFields: string[] = [];
                for (const field in error.errors) {
                    invalidFormFields.push(field);
                }
                return {error: invalidFormFields}
            }
            return {error: "Something went wrong."}
        }

    } catch (error) {
        console.log("Something went wrong while saving a new budget")
        return {error: "Something went wrong while saving a a new budget"}
    }
}

export const getCurrentBudget = async (userId: string, currentBudgetName: string) => {
    if (userId) {
        const res = await fetch(`http://localhost:3000/api/${userId}/budgets/${currentBudgetName}`)
        
        if (!res.ok) {
          throw new Error("Something went wrong")
        } 
        return res.json()
     }
}

export const getLatestBudget = async (userId: string, latestBudgetName: string) => {
    if (userId) {
        const res = await fetch(`http://localhost:3000/api/${userId}/budgets/${latestBudgetName}`)
        
        if (!res.ok) {
          throw new Error("Something went wrong")
        } 
        return res.json()
     }
}

export const getAllBudgetsByUserId = async (userId: string) => {
    if (userId) {
        const res = await fetch(`http://localhost:3000/api/${userId}/budgets`)

        if (!res.ok) {
            throw new Error("Something went wrong while fetching all budgets")
        } 
        return res.json()
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addComment = async (prevState: any, formData: any) => {
    const {budgetId} = Object.fromEntries(formData)
    try {
        connectToDb();
        const filter = {_id: budgetId}
        const newComment = {comment: "this is a new comment"};
        const update = {$push: {groceriesBudgetComments: newComment}};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const budget = await Budget.findOneAndUpdate(filter, update, {new: true});
    } catch (error) {
        console.log("console logged error")
        return {error: "Couldn't find requested budget"}
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addExpense = async (prevState: any, formData: any) => {
    const {userId, budgetId, name, value, group} = Object.fromEntries(formData);
    try {
        connectToDb();
        const newExpense = new Expense({
            userId: userId,
            budgetId: budgetId,
            name: name,
            value: value,
            group: group,
        })
        await newExpense.save();
        revalidatePath("/budgets")
        console.log("saving new Expense")
    } catch (error) {
        console.log(error)
        return {error: "Something went wrong while saving a new expense"}
    }
}

export const getAllExpensesByUserAndBudgetId = async (userId: string, budgetId: string) => {
    if (userId && budgetId) {
        const res = await fetch(`http://localhost:3000/api/${userId}/expenses/${budgetId}`);
        if (!res.ok) {
            throw new Error("Something went wrong while fetching all expenses.")
        }
        return res.json();
    }
}

export const getExpenseById = async (expenseId: string) => {
    if (expenseId) {
        const res = await fetch(`http://localhost:3000/api/expenses/${expenseId}`);
        if (!res.ok) {
            throw new Error("Something went wrong while fetching expense.")
        }
        return res.json();
    }
}

export const deleteExpenseById = async (expenseId: string | undefined) => {
    if (expenseId) {
        const res = await fetch(`http://localhost:3000/api/expenses/${expenseId}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error("Something went wrong while fetching expense.")
        }
        revalidatePath("/budgets")
        return res.json();
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editExpense = async (prevState: any, formData: any) => {
    const {expenseId, userId, budgetId, name, value, group} = Object.fromEntries(formData);
    console.log(formData, "editing expense")
    try {
        connectToDb();
        const editedExpense = {
            userId: userId,
            budgetId: budgetId,
            name: name,
            value: value,
            group: group,
        }
        await Expense.findOneAndUpdate({_id: expenseId}, editedExpense, {new: true});
        revalidatePath("/budgets")
    } catch (error) {
        console.log(error)
        return {error: "Something went wrong while saving a new expense"}
    }
}
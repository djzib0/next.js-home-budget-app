'use server'
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { Budget, User, BudgetComment } from "./models";
import { connectToDb } from "./mongooseUtils";
import bcrypt from "bcryptjs";
import { converYearToBudgetName } from "./utils";

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
        } = Object.fromEntries(formData);
        connectToDb();
        const newBudget = new Budget({
            budgetName: converYearToBudgetName(budgetNameYear) + budgetNameMonth,
            userId: userId,
            groceriesBudget: 0,
            eatingOutBudget: 0,
            otherFoodAndDrinksBudget: 0,
            groceriesBudgetComments: [new BudgetComment({comment: " test comment"})],
            doctorsBudget: 0,
            drugsBudget: 0,
            otherMedicalBudget: 0,
            fuelBudget: 0,
            publicTransportBudget: 0,
            otherTransportBudget: 0,
            clothesHerBudget: 0,
            clothesHisBudget: 0,
            clothesKidsBudget: 0,
            rentBudget: 0,
            electricityBudget: 0,
            waterSupplyAndSewageBudget: 0,
            gasBudget: 0,
            internetBudget: 0, 
            phonesBudget: 0,
            streamingServicesBudget: 0,
            hobbyBudget: 0,
            otherBudget: 0,
            clothesBudgetComments: [],
            billsBudget: 780,
            billsBudgetComments: [],
        })
        try {
            // try to find budget with the given budget name
            const budgets = await Budget.find({budgetName: converYearToBudgetName(budgetNameYear) + budgetNameMonth, userId: userId});
            // if the budget for specific month/year exists, ...
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
            return {error: "Something went wrong."}
        }

    } catch (error) {
        console.log("Something went wrong while saving a new budget")
        return {error: "Something went wrong while savinga a new budget"}
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
    console.log(userId, " userId, hihi")
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
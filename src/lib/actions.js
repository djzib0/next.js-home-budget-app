'use server'
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { Budget, User, BudgetComment } from "./models";
import { connectToDb } from "./mongooseUtils";
import bcrypt from "bcryptjs";

export const handleGitHubLogin = async () => {
    'use server'
    await signIn("github")
}

export const handleGitHubLogout = async () => {
    'use server'
    await signOut()
}

export const registerNewUser = async (prevState, formData) => {
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

export const login = async (prevState, formData) => {
    const {username, password} = Object.fromEntries(formData)

    try {
        await signIn("credentials", {username, password});
        revalidatePath("/budgets")
    } catch (error) {
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

export const createNewBudget = async (prevState, formData) => {
    try {
        const {userId} = Object.fromEntries(formData);
        connectToDb();
        const newBudget = new Budget({
            budgetName: "2412",
            userId: userId,
            groceriesBudget: "110",
            groceriesBudgetComments: [new BudgetComment({comment: " test comment"})],
            clothesBudget: 500,
            clothesBudgetComments: [],
            billsBudget: 780,
            billsBudgetComments: [],
        })

        try {
            // try to find budget with the given budget name
            const budget = await Budget.find({budgetName: "2412"});
            // if the budget for specific month/year exists, ...
            // ...return an error
            if (budget) {
                console.log("There is already a budget for this month.")
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

export const getBudget = async (budgetName) => {
    try {
        connectToDb();
        const budget = await Budget.findById(budgetName);
        if (budget) {
            return budget
        }
        
    } catch (error) {
        console.log("Couldn't find budget with the given id.")
        return {error: "Couldn't find budget with the give id."}
    }
    return {message: "There is no budget for current month."}
}

export const addComment = async (prevState, formData) => {
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
'use server'
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { Budget, User } from "./models";
import { connectToDb } from "./utils";
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
            budgetId: "2410",
            userId: userId,
            budgetData: "test data 3"
        })

        await newBudget.save();
        revalidatePath("/budgets")
    } catch (error) {
        console.log("Something went wrong while saving a new budget")
        return {error: "Something went wrong while savinga a new budget"}
    }
}
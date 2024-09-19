import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50
        },
        password: {
            type: String,
        },
        img: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)

const budgetSchema = new mongoose.Schema(
    {
        budgetId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: String,
            required: true,
        },
        budgetData: {
            type: String,
        }
    },
    {timestamps: true}
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);
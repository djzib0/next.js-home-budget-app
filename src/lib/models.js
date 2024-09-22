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

const budgetCommentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
        }
    },
    {timestamps: true}
)

const budgetSchema = new mongoose.Schema(
    {
        budgetId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        groceriesBudget: {
            type: Number,
            required: true,
        },
        groceriesBudgetComments: {
            type: [budgetCommentSchema],
        },
        clothesBudget: {
            type: Number,
        },
        clothesBudgetComments: {
            type: [budgetCommentSchema],
        },
        billsBudget: {
            type: Number,
        },
        billsBudgetComments: {
            type: [budgetCommentSchema],
        },

    },
    {timestamps: true}
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);
export const BudgetComment = mongoose.models.BudgetComment || mongoose.model("BudgetComment", budgetCommentSchema);

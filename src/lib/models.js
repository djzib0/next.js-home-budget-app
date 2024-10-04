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
        budgetName: {type: String,required: true},
        userId: {type: String,required: true},
        groceriesBudget: {type: Number,required: true},
        eatingOutBudget: {type: Number, required: true},
        groceriesBudgetComments: {type: [budgetCommentSchema]},
        otherFoodAndDrinksBudget: {type: Number, required: true},
        foodAndDrinksBudgetComments: {type: [budgetCommentSchema]},
        doctorsBudget: {type: Number, required: true},
        drugsBudget: {type: Number, required: true},
        otherMedicalBudget: {type: Number, required: true},
        healthBudgetComments: {type: [budgetCommentSchema]},
        fuelBudget: {type: Number, required: true},
        publicTransportBudget: {type: Number, required: true},
        otherTransportBudget: {type: Number, required: true},
        transportBudgetComments: {type: [budgetCommentSchema]},
        clothesHerBudget: {type: Number, required: true},
        clothesHisBudget: {type: Number, required: true},
        clothesKidsBudget: {type: Number, required: true},
        clothesBudgetComments: {type: [budgetCommentSchema]},
        rentBudget: {type: Number, required: true},
        electricityBudget: {type: Number, required: true},
        waterSupplyAndSewageBudget: {type: Number, required: true},
        gasBudget: {type: Number, required: true},
        otherBillsBudget: {type: Number, required: true},
        billsBudgetComments: {type: [budgetCommentSchema]},
        internetBudget: {type: Number, required: true},
        phonesBudget: {type: Number, required: true},
        streamingServicesBudget: {type: Number, required: true},
        otherDigitalServices: {type: Number, required: true},
        telecommunicationBudgetComments: {type: [budgetCommentSchema]},
        hobbyBudget: {type: Number, required: true},
        hobbyBudgetComments: {type: [budgetCommentSchema]},
        otherBudget: {type: Number, required: true},
        otherBudgetComments: {type: [budgetCommentSchema]},
    },
    {timestamps: true}
);

const expenseSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        budgetId: {type: String, required: true},
        value: {type: Number, required: true},
        group: {type: String, required: true}
    },
    {timestamps: true}
)

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);
export const BudgetComment = mongoose.models.BudgetComment || mongoose.model("BudgetComment", budgetCommentSchema);
export const Expense = mongoose.models.Expense|| mongoose.model("Expense", expenseSchema)

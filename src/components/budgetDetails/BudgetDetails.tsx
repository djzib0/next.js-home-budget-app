import { BudgetType, Expense } from "@/lib/types"
import { convertBudgetNameToDate } from "@/lib/utils"
import BudgetChart from "./budgetChart/BudgetChart"
import BudgetProgressBar from "./budgetProgressBar/BudgetProgressBar"
import ExpenseForm from "../expenseForm/ExpenseForm"
import { getAllExpensesByUserAndBudgetId } from "@/lib/actions"

const BudgetDetails = async ({budget, userId} : {budget: BudgetType, userId: string}) => {
  console.log(budget._id, " budget.id")
  console.log(userId, " user Id")
  const expenses = await getAllExpensesByUserAndBudgetId(userId, budget._id)
  console.log(expenses, "Expenses")

  const expensesArr = expenses.map((expense: Expense) => (
    <div key={expense.id}>{expense.value}</div>
  ))
  return (
    <div>
      {budget &&
        <div>
          <p>Budget for {convertBudgetNameToDate(budget.budgetName, 'en-EN')}</p>
          <BudgetChart budget={budget}/>
          <BudgetProgressBar />
          <ExpenseForm userId={userId} budgetId={budget._id} />
          {expensesArr}
        </div>
      }
    </div>
  )
}

export default BudgetDetails
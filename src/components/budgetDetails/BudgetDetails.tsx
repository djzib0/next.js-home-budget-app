import { BudgetType, Expense } from "@/lib/types"
import { convertBudgetNameToDate, sumBudget } from "@/lib/utils"
import BudgetChart from "./budgetChart/BudgetChart"
import BudgetProgressBar from "./budgetProgressBar/BudgetProgressBar"
import ExpenseForm from "../expenseForm/ExpenseForm"
import { getAllExpensesByUserAndBudgetId } from "@/lib/actions"

const BudgetDetails = async ({budget, userId} : {budget: BudgetType, userId: string}) => {
  const expenses = await getAllExpensesByUserAndBudgetId(userId, budget._id)

  const expensesArr = expenses.map((expense: Expense) => (
    <div key={expense.id}>
      {expense.value} - {expense.group}
    </div>
  ))
  return (
    <div>
      {<p>Budget value {sumBudget(budget)}</p>}
      {budget &&
      <div>
        <p>Budget for {convertBudgetNameToDate(budget.budgetName, 'en-EN')}</p>
          <BudgetChart budget={budget}/>
          <BudgetProgressBar />
          <ExpenseForm userId={userId} budgetId={budget._id} />
          {expenses && expensesArr}
      </div>
      }

    </div>
  )
}

export default BudgetDetails
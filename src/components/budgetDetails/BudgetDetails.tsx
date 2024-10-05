import { BudgetType } from "@/lib/types";
import { convertBudgetNameToDate, sumAllExpenses, sumBudget } from "@/lib/utils";
import BudgetChart from "./budgetChart/BudgetChart";
import BudgetProgressBar from "./budgetProgressBar/BudgetProgressBar";
import ExpenseForm from "../expenseForm/ExpenseForm";
import Expenses from "./expenses/Expenses";
import { getAllExpensesByUserAndBudgetId } from "@/lib/actions";

const BudgetDetails = async ({budget, userId} : {budget: BudgetType, userId: string}) => {

  const expenses = await getAllExpensesByUserAndBudgetId(userId, budget._id)

  return (
    <div>
      {<p>Budget value {sumBudget(budget)}</p>}
      {<p>Cost value {sumAllExpenses(expenses)}</p>}
      {budget &&
      <div>
        <p>Budget for {convertBudgetNameToDate(budget.budgetName, 'en-EN')}</p>
          <BudgetChart budget={budget}/>
          <BudgetProgressBar />
          <ExpenseForm userId={userId} budgetId={budget._id} />
          <Expenses expenses={expenses} />
      </div>
      }

    </div>
  )
}

export default BudgetDetails
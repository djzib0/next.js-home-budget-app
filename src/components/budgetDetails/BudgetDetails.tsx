import { BudgetType } from "@/lib/types";
import { convertBudgetNameToDate, sumAllExpenses, sumBudget } from "@/lib/utils";
import BudgetChart from "./budgetChart/BudgetChart";
import ProgressBar from "../progressBar/ProgressBar";
import ExpenseForm from "../expenseForm/ExpenseForm";
import Expenses from "./expenses/Expenses";
import { getAllExpensesByUserAndBudgetId } from "@/lib/actions";
// styles import
import styles from "./budgetDetails.module.css"
import BudgetSummary from "./budgetSummary/BudgetSummary";

const BudgetDetails = async ({budget, userId} : {budget: BudgetType, userId: string}) => {

  const expenses = await getAllExpensesByUserAndBudgetId(userId, budget._id)

  const budgetSum = sumBudget(budget);
  const expensesSum = sumAllExpenses(expenses);

  return (
    <div className={styles.budgetDetailsContainer}>
      {budget &&
      <div>
        <h1 id={styles.budgetTitle}>Budget for {convertBudgetNameToDate(budget.budgetName, 'en-EN')}</h1>
          <ProgressBar currentProgress={expensesSum} maxValue={budgetSum} />
          <div className={styles.budgetChartAndSummaryContainer}>
            <BudgetChart budget={budget}/>
            <BudgetSummary budgetSum={budgetSum} expensesSum={expensesSum} />
          </div>
          <ExpenseForm userId={userId} budgetId={budget._id} />
          <Expenses expenses={expenses} />
      </div>
      }

    </div>
  )
}

export default BudgetDetails
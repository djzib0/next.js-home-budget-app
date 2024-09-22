// styles import
import { auth } from "@/lib/auth";
import styles from "./budgets.module.css"
import BudgetsForm from "@/components/budgetsForm/BudgetsForm";
import { BudgetType } from "@/lib/types";
import { findLatestBudget } from "@/lib/utils";

const getData = async (userId: string | undefined) => {
  if (userId) {
    const res = await fetch(`http://localhost:3000/api/budgets/${userId}`)
    
    if (!res.ok) {
      throw new Error("Something went wrong")
    } 
    return res.json()
  }
}

const BudgetsPage = async () => {

  const session = await auth();

  const budgets: BudgetType[] = await getData(session?.user?.id);

  const latestBudgetId = findLatestBudget(budgets)
  const latestBudget = budgets.find((budget) => budget.budgetId === latestBudgetId)

  return (
    <div className={styles.container}>
      <p>{session?.user?.id}</p>
      {session && <BudgetsForm session={session} />}
      {/* {budgets && budgets.find((budget: BudgetType) => <p key={budget.budgetId}>{budget.budgetId}</p>)} */}
      {latestBudget && latestBudget.budgetId}
    </div>
  )
}

export default BudgetsPage